// import express
const express = require("express");
// import attendanceController
const attendanceController = require("../controllers/attendanceController");
// import middleware
const auth = require("../middleware/auth");

const attendanceRouter = express.Router();

// create attendance
attendanceRouter.post("/",auth.isAuth,attendanceController.createAttendance);
attendanceRouter.get("/all",auth.isAuth,attendanceController.getAllAttendance);
attendanceRouter.get("/:id",auth.isAuth,attendanceController.getAttendanceByUserId)
// export attendance router
module.exports = attendanceRouter;