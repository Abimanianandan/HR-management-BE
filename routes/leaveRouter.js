// import express
const express = require("express");
// import leaveController
const leaveController = require("../controllers/leaveController");
// import middleware
const auth = require("../middleware/auth");

const leaveRouter = express.Router();

// create routes
leaveRouter.post("/",auth.isAuth,leaveController.applyLeave)
leaveRouter.get("/:id",auth.isAuth,leaveController.getLeaveByUserId)
leaveRouter.put("/:id",auth.isAuth,leaveController.updateLeaveStatus)
leaveRouter.delete("/:id",auth.isAuth,leaveController.deleteLeave)

// export leaveRouter
module.exports = leaveRouter;