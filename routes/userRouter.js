// import express
const express  = require("express");

// import userController
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// import the express router
const userRouter = express.Router();

// define the endpoint
userRouter.post("/",userController.register) 
userRouter.post("/login",userController.login)

// authorized user endpoints
userRouter.get("/me", auth.isAuth, userController.me)
userRouter.put("/update", auth.isAuth ,userController.update)
userRouter.delete("/delete",auth.isAuth,userController.delete)
userRouter.get("/logout",auth.isAuth,userController.logout)


// export express router
module.exports = userRouter; 