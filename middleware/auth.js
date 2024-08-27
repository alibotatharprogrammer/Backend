const jsonwebtoken= require("jsonwebtoken");
const secretcode="oh ma nigga niggamani";
const authentication=(req,res,next)=>{
  try {
    const accessverfication=req.headers.authorization;
    const jwtverfication=jsonwebtoken.verify(accessverfication,secretcode)
    req.user=jwtverfication;
  } catch (error) {
    res.status(401).json({
      status:"Failed",
      message:"Unauthorized"
    });
    return;
  }
  next();
}

module.exports=authentication;
