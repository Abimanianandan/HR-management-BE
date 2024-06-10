const express = require('express');
const adminController = require("../controllers/adminController");
const auth = require('../middleware/auth');

// import the express router
const adminRouter = express.Router();

// admin route
adminRouter.post("/",adminController.register)
adminRouter.post("/login",adminController.login)

// authenticated admin
adminRouter.get("/me",auth.isAuth,adminController.me)
adminRouter.get("/allAdmins",adminController.getAllAdmins)
adminRouter.get("/allUsers",adminController.getAllUsers)
adminRouter.get("/:id",auth.isAuth,adminController.getUserById)
adminRouter.put("/:id",auth.isAuth,adminController.updateUserById)
adminRouter.delete("/:id",auth.isAuth,adminController.deleteUserById)

// export the admin route
module.exports = adminRouter;