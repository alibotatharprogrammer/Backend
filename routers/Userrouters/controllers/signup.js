const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken")
const secretcode = "oh ma nigga niggamani";
const signup = async (req, res) => {
  try {
    const Usermodel = mongoose.model("users");
  const { name, email, password, confirmpassword } = req.body;
  if (!name) throw "Enter the name please name is required";
  if (!email) throw "Enter the email please email is required";
  if (!password) throw "Enter the password please password is required";
  if (!confirmpassword) throw "Confirm the password please";
  if (password.length  < 5) throw "Password length must be above 5 letters";
  if (password != confirmpassword) throw "Your Passwords doesn't match";
  const userfindbyemail = await Usermodel.findOne({
    email:email,
  })
  console.log(req.body)
  if(userfindbyemail) throw "An account with this email already exist";
  const securepassword = await bcrypt.hash(password, 12)
  const usercreated = await Usermodel.create({
    name: name,
    email: email,
    password: securepassword,
  })
  const accesstoken = jsonwebtoken.sign({
    _id: usercreated._id,
    name: usercreated.name,
  },
    secretcode
  );
  
  res.status(200).json({
    status: "success",
    data: usercreated,
    accesstoken:accesstoken,
  })
  } 
  catch (error) { 
    res.status(409).json({
      status:"failed",
      message: error
    });
    return;
  }
};
module.exports = signup