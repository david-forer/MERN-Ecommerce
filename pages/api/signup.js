import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import Cart from "../../models/Cart";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // validate name, email, password
    if (!isLength(name, { min: 3, max: 25 })) {
      return res.status(422).send("Name must be between 3 and 25 characters");
    } else if (!isLength(password, { min: 7 })) {
      return res.status(422).send("Password must be at least 7 characters");
    } else if (!isEmail(email, { min: 7 })) {
      return res.status(422).send("Email must be valid");
    }
    // does user already exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    // if not hash password
    const hash = await bcrypt.hash(password, 10);
    // create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();
    console.log({ newUser });
    // create a cart for the new user
    await new Cart({ user: newUser._id }).save();
    // create token for user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // send back token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user! Please try again later");
  }
};
