const express=require("express");
const blogrouters= express.Router();
const authentication = require("../../middleware/auth");
const addablog = require("./controllers/addblog");
const updateablog = require("./controllers/updateblog");
const deleteablog = require("./controllers/deleteblog");
blogrouters.use(express.json());
//Middleware
blogrouters.use(authentication);

//Routes

blogrouters.post("/addablog",addablog);
blogrouters.put("/updateblog/:id",updateablog);
blogrouters.delete("/deleteblog/:id",deleteablog);

module.exports=blogrouters;