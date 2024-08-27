const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken")
const secretcode = "oh ma nigga niggamani";
const login = async (req, res) => {
  try {
    const Usermodel = mongoose.model("users");
    const { email, password } = req.body;
    const finduser = await Usermodel.findOne({
      email: email,
    })
    if (!finduser) throw "A user with this email does not exsist";
    const comparepassword = await bcrypt.compare(password, finduser.password)
    if (!comparepassword) throw "Email and passwords doesn't match"
    const accesstoken = await jsonwebtoken.sign({
      _id: finduser._id,
      name: finduser.name,
    },
      secretcode
    );
    res.status(200).json({
      status: "Success",
      message: "You are logged in",
      accesstoken: accesstoken,
    });
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Failed Loging in"
    })
    return;
  }
}
module.exports = login;