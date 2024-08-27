const mongoose = require("mongoose");

const updateablog = async (req, res) => {
  try {
    const Usermodel = mongoose.model("users");
    const Blogsmodel = mongoose.model("Blogs");

    const { title, description, catogery, image } = req.body;

    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("Description is required");
    if (!catogery) throw new Error("Category is required"); 
    if (!image) throw new Error("Image is required");
    if (title.length < 3) throw new Error("Title length must be greater than 3");
    if (description.length < 5) throw new Error("Description length must be greater than 5");
    if (category.length < 3) throw new Error("Category length must be greater than 3");

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
      return res.status(403).json({ status: "failed", message: "Not allowed to edit this blog" });
    }

    // Update the blog
    blog = await Blogsmodel.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, catogery, image } }, 
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      message: "Updated successfully",
      blog, 
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
};

module.exports = updateablog;
