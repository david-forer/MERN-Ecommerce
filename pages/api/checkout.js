import Stripe from "stripe";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import Order from "../../models/Order";
import calculateCartTotal from "../../utils/calculateCartTotal";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentData } = req.body;

  try {
    // verify and get userid from token
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // find cart based on userid
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    });
    // calc cart totals
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);
    // get email for payment data, check if exists
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    });
    const isExistingCustomer = prevCustomer.data.length > 0;
    //  not cust, create based on email
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      });
    }
    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    // create charge total, send receipt
    const charge = await stripe.charges.create(
      {
        currency: "USD",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
      },
      {
        idempotency_key: uuidv4(),
      }
    );
    // add order date to db
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products,
    }).save();
    // clear products in cart
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });
    // send back success
    res.status(200).send("Checkout Successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing charge");
  }
};
