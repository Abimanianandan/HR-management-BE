// import express
const express = require("express");
// import leaveController
const leaveController = require("../controllers/leaveController");
// import middleware
const auth = require("../middleware/auth");

const leaveRouter = express.Router();

// create routes
leaveRouter.post("/",leaveController.applyLeave)
leaveRouter.get("/allLeaves",leaveController.getAllLeave)
leaveRouter.get("/:id",leaveController.getLeaveByLeaveId)
leaveRouter.put("/:id",leaveController.updateLeaveByLeaveId)
leaveRouter.delete("/:id",leaveController.deleteLeave)

// export leaveRouter
module.exports = leaveRouter;