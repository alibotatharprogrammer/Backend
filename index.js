const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port=8000;
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/blogs',{}).then(()=>{
  console.log("Connected to mongoose")
}).catch(()=>{
  console.log("Error Occured")
})
//Models Schema
require("./models/Userschema")
require("./models/Blogschemamodel")
//Routes
const userrouters=require("./routers/Userrouters/userrouters");
const blogrouters = require('./routers/blogsrouters/blogrouters');


app.use("/api/user",userrouters);
app.use("/api/blog",blogrouters);

app.listen(port,()=>{
  console.log(`Running at port http://localhost:${port}` )
})