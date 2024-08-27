const mongoose = require("mongoose");

const addablog = async (req, res) => {
  try {
    const Usermodel = mongoose.model("users");
    const Blogsmodel = mongoose.model("Blogs");

    const { title, description, catogery, image } = req.body;

    if (!title) throw ("Title is required");
    if (!description) throw ("Description is required");
    if (!catogery) throw ("Catogery is required");
    if (!image) throw ("Image is required");
    if (title.length < 3) throw ("Title length must be greater than 3");
    if (description.length < 5) throw ("Description length must be greater than 5");
    if (catogery.length < 3) throw("Catogery length must be greater than 3");

    await Blogsmodel.create({
      user_id: req.user._id,
      title: title,
      description: description,
      catogery: catogery,
      image: image,
    });

    res.status(200).json({
      success: "Success",
      message: "Blog added successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = addablog;