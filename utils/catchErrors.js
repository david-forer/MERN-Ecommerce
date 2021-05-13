function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // request made, server responded  with not 2XX
    errorMsg = error.response.data;
    console.error("Error response", errorMsg);

    //  for cloudinary errors
    if (error.response.data.error) errorMsg = error.response.data.error.message;
  } else if (error.request) {
    //  request made, no response
    errorMsg = error.requestconsole.log("Error request", errorMsg);
  } else {
    // something else happened
    errorMsg = error.message;
    console.error("Error message", errorMsg);
  }
  displayError(errorMsg);
}

export default catchErrors
