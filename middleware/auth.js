// import the jwt token
const jwt = require("jsonwebtoken");
// import the config module
const config = require("../utils/config");
// import the user module
const User = require("../models/user");

const auth = {
      
       isAuth : (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    try {
      const decodedToken = jwt.verify(token, config.JWT_SECRET);
      req.userId = decodedToken.id;
      // Call the next middleware
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
      },
      isAdmin: async (req,res,next)=>{
        try{
           // get the userId from the request object
            const userId = req.userId;
           // find the user by Id
            const user = await User.findById(userId);
           // if the user is not found return error message 
            if(!user){
              res.status(500).json({message:"user not found"});
           }
           // check the user is an admin return the error message
           if(user.role !== "admin"){
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