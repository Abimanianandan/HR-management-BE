// import express
const express = require("express");
// import salaryController
const salaryController = require("../controllers/salaryController");
// import middleware
const auth = require("../middleware/auth");

const salaryRouter = express.Router();

// create routes
salaryRouter.post('/', auth.isAuth, salaryController.createSalary);
salaryRouter.get('/:userId', auth.isAuth, salaryController.getSalaryByUserId);
salaryRouter.put('/:salaryId', auth.isAuth, salaryController.updateSalary);
salaryRouter.delete('/:salaryId', auth.isAuth, salaryController.deleteSalary);

// export router
module.exports = salaryRouter;