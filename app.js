// import express
const express = require("express");

// import userRouter
const userRouter = require("./routes/userRouter")

// import the admin router
const adminRouter = require("./routes/adminRouter")

// import the attendance router
const attendanceRouter = require("./routes/attendanceRouter")

// import the salary router
const salaryRouter = require("./routes/salaryRouter")

// import the leave router
const leaveRouter = require("./routes/leaveRouter")

// import the document router
const documentRouter = require("./routes/documentRouter")

// import cors
const cors = require("cors");

// import cookie-parser
const cookieParser = require("cookie-parser");

// import morgan
const morgan = require("morgan");
// create a express app
const app = express();

// use cors middleware
app.use(cors({
    origin:"http://localhost:3001",
    credentials:true
}));

// use the cookie-parser middleware
app.use(cookieParser());

// use the morgan middleware
app.use(morgan("dev"));

// use the express middleware
app.use(express.json());


// define endpoints
app.use("/api/users",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/attendance",attendanceRouter)
app.use("/api/salary",salaryRouter)
app.use("/api/leave",leaveRouter)
app.use("/api/document",documentRouter)
// export the app module
module.exports = app;