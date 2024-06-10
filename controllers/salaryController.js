const Salary = require("../models/salary");

// create controller
const salaryController = ({
    createSalary: async (req, res) => {
        try {
            const { userId, basicPay, allowances, bonuses, deductions } = req.body;
            const netPay = basicPay + allowances + bonuses - deductions;

            const newSalary = new Salary({
                userId,
                basicPay,
                allowances,
                bonuses,
                deductions,
                netPay
            });

            const salary = await newSalary.save();
            res.status(201).json({ message: "Salary created successfully", salary });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getSalaryByUserId: async (req, res) => {
        try {
            const userId = req.params.userId;
            const salaries = await Salary.find({ userId });
            if (salaries.length > 0) {
                res.status(200).json(salaries);
            } else {
                res.status(404).json({ message: "No salary records found for this user" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateSalary: async (req, res) => {
        try {
            const salaryId = req.params.salaryId;
            const updatedData = req.body;
            if (updatedData.basicPay !== undefined || updatedData.allowances !== undefined || updatedData.bonuses !== undefined || updatedData.deductions !== undefined) {
                const salary = await Salary.findById(salaryId);
                if (!salary) {
                    return res.status(404).json({ message: "Salary not found" });
                }
                salary.basicPay = updatedData.basicPay !== undefined ? updatedData.basicPay : salary.basicPay;
                salary.allowances = updatedData.allowances !== undefined ? updatedData.allowances : salary.allowances;
                salary.bonuses = updatedData.bonuses !== undefined ? updatedData.bonuses : salary.bonuses;
                salary.deductions = updatedData.deductions !== undefined ? updatedData.deductions : salary.deductions;
                salary.netPay = salary.basicPay + salary.allowances + salary.bonuses - salary.deductions;
                await salary.save();
                res.status(200).json({ message: "Salary updated successfully", salary });
            } else {
                res.status(400).json({ message: "No valid fields provided for update" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteSalary: async (req, res) => {
        try {
            const salaryId = req.params.salaryId;
            const result = await Salary.findByIdAndDelete(salaryId);
            if (result) {
                res.status(200).json({ message: "Salary deleted successfully" });
            } else {
                res.status(404).json({ message: "Salary not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

})

// export salaryController
module.exports = salaryController;