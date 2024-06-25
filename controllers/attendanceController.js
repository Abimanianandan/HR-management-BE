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
            status: req.body.status,
            date: req.body.date
        })
        // save the attendance object
        const attendance = await newAttendance.save();
        // return a success message
        res.status(200).json({message:"Attendance created successfully",attendance})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    // get all attendance
    getAllAttendance: async (req,res)=>{
        try{
        // get the all user attendance from database
            const attendance = await Attendance.find();
        // return a success message
           res.status(200).json({attendance});
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    // get attendance by attendance id
   
    getAttendanceByAttendanceId: async (req, res) => {
        try {
            const attendanceId = req.params.id;
            const attendance= await Attendance.findById(attendanceId);
            if (attendance) {
                res.status(200).json(attendance);
            } else {
                res.status(404).json({ message: "No attendance record found for this ID" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
   
   
    updateAttendanceByAttendanceId: async (req, res) => {
        try {
            const attendanceId = req.params.id;
            const { status } = req.body;

            const attendance = await Attendance.findById(attendanceId);
            if (!attendance) {
                return res.status(404).json({ message: "Attendance not found" });
            }

            attendance.status = status;
            await attendance.save();

            res.status(200).json({ message: "attendance status updated successfully", attendance });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteAttendanceById: async(req,res)=>{
        try{
          // get the attendance id from params
          const attendanceId = req.params.id;
          // delete attendance
          await Attendance.findByIdAndDelete(attendanceId);
          // return success message
          res.status(200).json({message:"Attendance deleted successfully"})
        }catch(error){
          res.status(500).json({message:error.message})
        }
     },
})
// export attendanceController
module.exports = attendanceController;