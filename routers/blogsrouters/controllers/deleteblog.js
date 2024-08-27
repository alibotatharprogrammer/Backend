const mongoose = require("mongoose");
 const deleteablog= async (req,res)=>{


  try {

    const Usermodel = mongoose.model("users");
    const Blogsmodel = mongoose.model("Blogs");
  
    const user = await Usermodel.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }
  
    
  
      // Find blog by ID
      let blog = await Blogsmodel.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ status: "failed", message: "Blog not found" });
      }
      if (blog.user_id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ status: "failed", message: "Not allowed to delete this blog" });
      }
  
          // Delete the blog
          blog = await Blogsmodel.findByIdAndDelete(
            req.params.id
          );
  
          res.status(200).json({
            status: "Success",
            message: "Deleted successfully", 
          });
    
  } catch (error) {
    res.status(400).json({
      status:"Failed",
      message:error.message
    })
  }

}
 module.exports=deleteablog;