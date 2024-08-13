// import the jwt token
const jwt = require("jsonwebtoken");
// import the config module
const config = require("../utils/config");
// import the user module
const User = require("../models/user");
// import the admin module 
const Admin = require("../models/admin")

const auth = {
      
       isAuth : (req, res, next) => {
        try{
          const token = req.cookies.token;
          if(!token){
            res.status(401).json({message:"unAuthorized"})
          }
           try{
             const decodedToken = jwt.verify(token,config.JWT_SECRET);
             req.adminId = decodedToken.id;
             next();
           }catch(error){
            res.status(500).json({message:"Invalid token"})
           }
        } catch(error){
          res.status(500).json({message:error.message})
        }
       },
  // try {
  //   // Get the token from the Authorization header
  //   const authHeader = req.headers.authorization;
  //   if (!authHeader) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }

  //   const token = authHeader.split(' ')[1]; // Extract the token part
  //   if (!token) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }

  //   // Verify the token
  //   try {
  //     const decodedToken = jwt.verify(token, config.JWT_SECRET);
  //     req.userId = decodedToken.id;
  //     // Call the next middleware
  //     next();
  //   } catch (error) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }
  // } catch (error) {
  //   return res.status(500).json({ message: error.message });
  // }
      
      isAdmin: async (req,res,next)=>{
        try{
           // get the adminId from the request object
            const adminId = req.adminId;
           // find the admin by Id
            const admin = await Admin.findById(adminId);
           // if the admin is not found return error message 
            if(!admin){
              res.status(500).json({message:"admin not found"});
           }
           // check the  admin return the error message
           if(admin.role !== "admin"){
            res.status(403).json({message:"Forbidden"})
           }  
           // call the next middleware
           next() 
        } catch(error){
          res.status(500).json({message:error.message})
        }
      }
}

// export auth
module.exports = auth;