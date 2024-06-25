// import express
const express  = require("express");

// import userController
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// import the express router
const userRouter = express.Router();

// define the endpoint
userRouter.post("/register",userController.register) 
userRouter.post("/login",userController.login)

// authorized user endpoints
userRouter.get("/me",  userController.me)
userRouter.put("/update", userController.update)
userRouter.delete("/delete",userController.delete)
userRouter.get("/logout",userController.logout)


// export express router
module.exports = userRouter; 