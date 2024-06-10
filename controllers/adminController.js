// import admin model
const Admin = require("../models/admin");
const User = require("../models/user")
// import bcrypt library
const bcrypt = require("bcrypt")
// import the config module
const config = require("../utils/config")
// import jsonwebtoken
const jwt = require("jsonwebtoken")

const adminController = {
    //   define the admin methods

// create admin
register: async (req,res)=>{  
    try {
       // get the admin inputs from the request body
       const {adminname,password,name,location} = req.body;
 
       // check if the admin is already exists
       const admin = await Admin.findOne({adminname});
       // if the admin exists, return error message
       if(admin){
        
           return res.status(400).json({message:"admin already exits"});
       }
       
       // hash  the password
       const passwordHash = await bcrypt.hash(password,10);
 
       // create new admin
          const newAdmin = new Admin({
             adminname,
             passwordHash,
             name,
             location
       });
       
       // save the admin
       const savedAdmin = await newAdmin.save();
      // return a success message with the saved user
      res.status(201).json({message:"Admin created successfully",admin:savedAdmin});    
    } catch (error) {
       res.status(500).json({message:error.message})
    }
   
 },
 //   login admin
 login: async (req,res)=>{
   try {
      // get the admin inputs
      const {adminname,password} = req.body
      const admin = await Admin.findOne({adminname});
      // check the inValid username return a error message
      if(!admin){
        return res.status(400).json({message:"Invalid adminname"})
      }
      // compare the passwors
      const isCorrectPassword = await bcrypt.compare(password,admin.passwordHash);
      // check the inValid password return a error message
      if(!isCorrectPassword){
        return res.status(400).json({message:"Invalid password"})
      }
      // if the password is correct generate a token and return a success message
      const token = jwt.sign({
         adminname : admin.adminname,
         id : admin._id,
         name:admin.name
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
  //   view admin
  me: async (req,res)=>{
   try{
      //  get the adminId from the request object
      const adminId = req.userId;
      
      // find user by id from the database
      const admin = await Admin.findById(adminId).select("-passwordHash -_v -_id");
      // if the admin is does not exit, return an error message
      if(!admin){
         return res.status(400).json({message:"admin not found"})
      }
      // return the user details
      return res.status(200).json({admin});
   } catch(error){
      res.status(500).json({message:error.message})
   }
  },
//   get the all admin
  getAllAdmins: async (req,res)=>{
   try{
     //  grt all admins from the database
     const admins = await Admin.find().select('-passwordHash-__v');
     // return the error message
     res.status(200).json({admins});
   } catch (error){
      res.status(500).json({message:error.message})
   }
 },
 //   get the all users
   getAllUsers: async (req,res)=>{
     try{
       //  grt all users from the database
       const users = await User.find().select('-passwordHash-__v');
       // return the success message
       res.status(200).json({users});
     } catch (error){
        res.status(500).json({message:error.message})
     }
   },
 // get the user by id
   getUserById: async (req,res)=>{
    try{
       // get the user Id from reqest parameters
       const userId = req.params.id
       // get the user by id from the database
       const user = await User.findById(userId).select('-passwordHash-__v')
       // if the user does not exit return a error message
       if(!user){
          res.status(400).json({message:"user not found"})
       }
       // return the user
       res.status(200).json({user})
    }catch(error){
       res.status(500).json({message:error.message})
    }
   },
 // update the user by id
   updateUserById: async (req,res)=>{
    try{
       // get the user id from the request parameters
         const userId = req.params.id;
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
//  delete the user by id
   deleteUserById: async(req,res)=>{
   try{
     // get the user id from params
     const userId = req.params.id;
     // delete user
     await User.findByIdAndDelete(userId);
     // return success message
     res.status(200).json({message:"User deleted successfully"})
   }catch(error){
     res.status(500).json({message:error.message})
   }
},
   
 }
 // export the controller
 module.exports = adminController;