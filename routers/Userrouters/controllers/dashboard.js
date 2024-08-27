const mongoose = require("mongoose");
const dashboard = async (req,res) => {
 try {
  const Usermodel = mongoose.model("users");
  const Blogsmodel = mongoose.model("Blogs");
  const getuser = await Usermodel.findOne({
    _id:req.user._id,
  }).select("-password");
 
  const blogs= await Blogsmodel.find({
    user_id:req.user._id,
  }).limit(3);
 
  res.status(200).json({
    success:"success",
    data:getuser,
    blogs:blogs,
  })
 } catch (error) {
  res.status(400).json({
    status:"Failed",
    message:error.message
  })
  return;
 }
}
module.exports=dashboard;