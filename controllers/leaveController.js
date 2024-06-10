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

    getLeaveByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const leaves = await Leave.find({ userId });
            if (leaves.length > 0) {
                res.status(200).json(leaves);
            } else {
                res.status(404).json({ message: "No leave records found for this user" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateLeaveStatus: async (req, res) => {
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