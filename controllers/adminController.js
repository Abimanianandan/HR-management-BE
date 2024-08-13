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

// create user

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

login : async (req, res) => {
  try {
    const { adminname, password } = req.body;

    // Check if username or password is missing
    if (!adminname || !password) {
      return res.status(400).json({ message: "Adminname and password are required" });
    }

    // Find admin by adminname
    const admin = await Admin.findOne({ adminname });

    // Check if admin exists
    if (!admin) {
      return res.status(400).json({ message: "Invalid adminname or password" });
    }

    // Compare the provided password with hashed password in database
    const isCorrectPassword = await bcrypt.compare(password, admin.passwordHash);

    // Check if password is correct
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid adminname or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, config.JWT_SECRET, { expiresIn: '1h' });

    // Set cookie with the token
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000, 
      secure: false 
    });

    // Send success response
    res.status(200).json({ message: "Login successful",token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
},

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
  //   view admin
  me: async (req,res)=>{
   try{
      //  get the adminId from the request object
      const adminId = req.adminId;
      
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
 
 getUserById: async (req, res) => {
  try {
      // Get the user ID from request parameters
      const userId = req.params.id;

      // Find the user by ID from the database, excluding passwordHash and __v fields
      const user = await User.findById(userId).select('-passwordHash -__v');

      // If the user does not exist, return an error message
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Return the user
      return res.status(200).json({ user });
  } catch (error) {
      // Handle errors and return a 500 status with the error message
      return res.status(500).json({ message: error.message });
  }
},

   updateUserById: async (req,res)=>{
    try{
       // get the user id from the request parameters
         const userId = req.params.id;
        // get the user inputs
        const {name,location,username} = req.body;
        // find user by id from the database
        const user = await User.findById(userId)
        // if the user is does not exit, return an error message
        if(!user){
           return res.status(400).json({message:"user not found"})
        }
        // update user
        if(name) user.name = name;
        if(location) user.location = location;
        if(username) user.username = username;
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