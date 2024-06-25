// import express
const express = require("express");
// import attendanceController
const attendanceController = require("../controllers/attendanceController");
// import middleware
const auth = require("../middleware/auth");

const attendanceRouter = express.Router();

// create attendance
attendanceRouter.post("/",attendanceController.createAttendance);
attendanceRouter.get("/allAttendance",attendanceController.getAllAttendance);
attendanceRouter.get("/:id",attendanceController.getAttendanceByAttendanceId);
attendanceRouter.put("/:id",attendanceController.updateAttendanceByAttendanceId);
attendanceRouter.delete("/:id",attendanceController.deleteAttendanceById)
// export attendance router
module.exports = attendanceRouter;