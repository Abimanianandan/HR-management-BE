// import attendance model
const Attendance = require("../models/attendance");

// create attendance controller
const attendanceController = ({
    // create attendance
    createAttendance: async (req,res)=>{
        try{
        // get the userId
           const userId = req.userId;
        // create a new attendance
        const newAttendance = new Attendance({
            userId: req.body.userId,
            status: req.body.status
        })
        // save the attendance object
        const attendance = await newAttendance.save();
        // return a success message
        res.status(200).json({message:"Attendance created successfully",attendance})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    getAllAttendance: async (req,res)=>{
        try{
        // get the all user attendance from database
            const attendance = await Attendance.find();
        // return a success message
           res.status(500).json({attendance});
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    getAttendanceByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(userId)
            const attendances = await Attendance.find({ userId: userId });
            if (attendances.length > 0) {
                res.status(200).json(attendances);
            } else {
                res.status(404).json({ message: "No attendance records found for this user" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
})
// export attendanceController
module.exports = attendanceController;