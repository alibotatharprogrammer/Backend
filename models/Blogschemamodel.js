 const mongoose = require('mongoose');
 const Blogsschema = new mongoose.Schema
 ({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  },
  title:{
    type:String,
    required:[true,"Title is required"]
  },
  description:{
    type:String,
    required:[true,"Description is required"]
  },
  catogery:{
    type:String,
    required:[true,"Catogery is required"]
  },
  image:{
    type:String,
    required:[true,"Image is required"]
  }
 },
{
  timestamps:true,
});
const Blogsmodel = mongoose.model("Blogs", Blogsschema);
module.exports = Blogsmodel;