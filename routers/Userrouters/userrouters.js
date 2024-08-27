const express=require("express");
const userrouters= express.Router();
const signup=require("./controllers/signup");
const login=require("./controllers/login");
const authentication = require("../../middleware/auth");
const dashboard = require("./controllers/dashboard");

//Routera
userrouters.post("/signup",signup);
userrouters.post("/login",login);

//Middleware
userrouters.use(authentication);

//After authentication
userrouters.get("/dashboard",dashboard)

module.exports=userrouters;