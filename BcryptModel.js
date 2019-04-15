DATABASE CODE 

const mongoose = require("mongoose");
const User = {
  name: String,
  password: String,
  email: String,
};

const Usermodel = mongoose.model("User", User);
module.exports = Usermodel;
