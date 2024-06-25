const Leave = require("../models/leave")

const leaveController = ({
    applyLeave: async (req, res) => {
        try {
            const { userId, leaveType, startDate, endDate, reason } = req.body;

            const newLeave = new Leave({
                userId,
                leaveType,
                startDate,
                endDate,
                reason
            });

            const leave = await newLeave.save();
            res.status(201).json({ message: "Leave applied successfully", leave });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getAllLeave: async (req,res)=>{
        try{
          //  grt all leave from the database
          const leave = await Leave.find().select('-passwordHash-__v');
          // return the success message
          res.status(200).json({leave});
        } catch (error){
           res.status(500).json({message:error.message})
        }
      },

    getLeaveByLeaveId: async (req, res) => {
        try {
            const leaveId = req.params.id;
            const leave = await Leave.findById(leaveId);
            if (leave) {
                res.status(200).json(leave);
            } else {
                res.status(404).json({ message: "No leave record found for this ID" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    updateLeaveByLeaveId: async (req, res) => {
        try {
            const leaveId = req.params.id;
            const { status } = req.body;

            const leave = await Leave.findById(leaveId);
            if (!leave) {
                return res.status(404).json({ message: "Leave not found" });
            }

            leave.status = status;
            await leave.save();

            res.status(200).json({ message: "Leave status updated successfully", leave });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteLeave: async (req, res) => {
        try {
            const leaveId = req.params.id;
            const result = await Leave.findByIdAndDelete(leaveId);
            if (result) {
                res.status(200).json({ message: "Leave deleted successfully" });
            } else {
                res.status(404).json({ message: "Leave not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

})

// export leaveController
module.exports = leaveController;