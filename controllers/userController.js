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

login : async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with hashed password in database
    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

    // Check if password is correct
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        name: user.name
      },
      config.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set cookie with the token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Use 'false' if not using HTTPS
      sameSite: "none", // Use 'None' if hosting on a different domain
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day expiry
    });

    // Send success response with token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    // Handle server errors
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
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