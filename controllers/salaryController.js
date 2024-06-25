const Salary = require("../models/salary");

// create controller
const salaryController = ({
    createSalary: async (req, res) => {
        try {
            const { userId, basicPay, allowances, bonuses, deductions } = req.body;
            // const total = (basicPay + allowances +bonuses) - deductions;
            
            if (!userId || basicPay == null || allowances == null || bonuses == null || deductions == null) {
                return res.status(400).json({ message: "All fields are required" });
            }
              // Ensure the values are numbers
              const basicPayNum = Number(basicPay);
              const allowancesNum = Number(allowances);
              const bonusesNum = Number(bonuses);
              const deductionsNum = Number(deductions);
  
              // Calculate total salary
              const total = (basicPayNum + allowancesNum + bonusesNum) - deductionsNum;
  
              // Create a new Salary document
              const newSalary = new Salary({
                  userId,
                  basicPay: basicPayNum,
                  allowances: allowancesNum,
                  bonuses: bonusesNum,
                  deductions: deductionsNum,
                  total
              });
  
              // Save the document to the database
              const salary = await newSalary.save();
              res.status(201).json({ message: "Salary created successfully", salary });
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      },

    getAllSalary: async (req,res)=>{
        try{
          //  grt all salaries from the database
          const salaries = await Salary.find().select('-passwordHash-__v');
          // return the success message
          res.status(200).json({salaries});
        } catch (error){
           res.status(500).json({message:error.message})
        }
      },
   
    getSalaryBySalaryId: async (req, res) => {
        try {
            const salaryId = req.params.salaryId;
            const salary = await Salary.findById(salaryId);
            if (salary) {
                res.status(200).json(salary);
            } else {
                res.status(404).json({ message: "No salary record found for this ID" });
            }
        } catch (error) {
            if (error.name === 'CastError') {
                res.status(400).json({ message: "Invalid salary ID format" });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    },
    
     updateSalary : async (req, res) => {
        try {
            const salaryId = req.params.salaryId;
            const updatedData = req.body;
    
            // Logging for debugging
            console.log(`Updating salary with ID: ${salaryId}`);
            console.log('Received updated data:', updatedData);
    
            const fieldsToUpdate = ['basicPay', 'allowances', 'bonuses', 'deductions'];
            const hasValidFields = fieldsToUpdate.some(field => updatedData[field] !== undefined);
    
            if (!hasValidFields) {
                console.log('No valid fields provided for update');
                return res.status(400).json({ message: "No valid fields provided for update" });
            }
    
            const salary = await Salary.findById(salaryId);
            if (!salary) {
                console.log('Salary not found');
                return res.status(404).json({ message: "Salary not found" });
            }
    
            fieldsToUpdate.forEach(field => {
                if (updatedData[field] !== undefined) {
                    console.log(`Updating field: ${field} to value: ${updatedData[field]}`);
                    salary[field] = updatedData[field];
                }
            });
    
            salary.total = salary.basicPay + salary.allowances + salary.bonuses - salary.deductions;
    
            await salary.save();
            console.log('Salary updated successfully:', salary);
            res.status(200).json({ message: "Salary updated successfully", salary });
        } catch (error) {
            console.log('Error updating salary:', error);
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