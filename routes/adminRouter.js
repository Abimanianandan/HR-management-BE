const express = require('express');
const adminController = require("../controllers/adminController");
const auth = require('../middleware/auth');

// import the express router
const adminRouter = express.Router();

// admin route
adminRouter.post("/",adminController.register)
adminRouter.post("/login",adminController.login)

// authenticated admin
adminRouter.get("/logout",adminController.logout)
adminRouter.get("/allAdmins",adminController.getAllAdmins)
adminRouter.get("/allUsers",adminController.getAllUsers)
adminRouter.get("/:id",adminController.me)
adminRouter.get("/:id",adminController.getUserById)
adminRouter.put("/:id",adminController.updateUserById)
adminRouter.delete("/:id",adminController.deleteUserById)

// export the admin route
module.exports = adminRouter;