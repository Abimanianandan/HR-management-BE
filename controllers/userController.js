// import the user model
const User = require("../models/user");
// import bcrypt library
const bcrypt = require("bcrypt")
// import the config module
const config = require("../utils/config")
// import jsonwebtoken
const jwt = require("jsonwebtoken")
//  create controller
const userController = {
// define the users method

//   create user
  register: async (req,res)=>{  
     try {
        // get the user inputs from the request body
        const {username,password,name,location} = req.body;

        // check if the user is already exists
        const user = await User.findOne({username});
        // if the user exists, return error message
        if(user){
         
            return res.status(400).json({message:"User already exits"});
        }
        
        // hash  the password
        const passwordHash = await bcrypt.hash(password,10);

        // create new user
           const newUser = new User({
              username,
              passwordHash,
              name,
              location
        });
        
        // save the user
        const savedUser = await newUser.save();
       // return a success message with the saved user
       res.status(201).json({message:"User created successfully",user:savedUser});    
     } catch (error) {
        res.status(500).json({message:error.message})
     }
    
  },
//   login user
  login: async (req,res)=>{
   try {
      // get the user inputs
      const {username,password} = req.body
      const user = await User.findOne({username});
      // check the inValid username return a error message
      if(!user){
        return res.status(400).json({message:"Invalid username"})
      }
      // compare the passwors
      const isCorrectPassword = await bcrypt.compare(password,user.passwordHash);
      // check the inValid password return a error message
      if(!isCorrectPassword){
        return res.status(400).json({message:"Invalid password"})
      }
      // if the password is correct generate a token and return a success message
      const token = jwt.sign({
         username : user.username,
         id : user._id,
         name:user.name
      },config.JWT_SECRET)
      // set the cookie with the token
      res.cookie('token',token,{
         httpOnly:true,
         secure:true,
         sameSite:"none",
         expire:new Date(Date.now() + 24 * 60 * 60 * 1000)
      });
      res.status(200).json({message:"Login Successfully",token})
   } catch (error) {
      res.status(500).json({message:error.message})
   }
  },
//   view user
  me: async (req,res)=>{
   try{
      //  get the userId from the request object
      const userId = req.userId;
      // find user by id from the database
      const user = await User.findById(userId).select("-passwordHash -_v -_id");
      // if the user is does not exit, return an error message
      if(!user){
         return res.status(400).json({message:"user not found"})
      }
      // return the user details
      return res.status(200).json({user});
   } catch(error){
      res.status(500).json({message:error.message})
   }
  },
//   update user
  update: async (req,res)=>{
   try{
      //  get the userId from the request object
      const userId = req.userId;
      // get the user inputs
      const {name,location} = req.body;
      // find user by id from the database
      const user = await User.findById(userId)
      // if the user is does not exit, return an error message
      if(!user){
         return res.status(400).json({message:"user not found"})
      }
      // update user
      if(name) user.name = name;
      if(location) user.location = location;
      const updatedUser = await user.save();

      // return the  updates user details
      return res.status(200).json({message:"user update successfully",user: updatedUser});
   } catch(error){
      res.status(500).json({message:error.message})
   }
  },
//   delete user
  delete: async (req,res)=>{
   try{
       //  get the userId from the request object
     const userId = req.userId;
     // delete the user from the database
     const deletedUser = await User.findByIdAndDelete(userId);
      // if the user is does not exit, return an error message
      if(!deletedUser){
        return res.status(400).json({message:"user not found"})
     }
   
   // return the success message
   res.status(200).json({message:"user deleted successfully"})
   } catch(error){
      res.status(500).json({message:error.message})
   }
    
  },
//   logout user
  logout: async (req,res)=>{
   try{
      // clear the token
       res.clearCookie("token");
      // return success message
      res.status(500).json({message:"logout successfully"})
   } catch(error){
      res.status(500).json({message:error.message})
   }
  },
}


// export the controller
module.exports = userController;