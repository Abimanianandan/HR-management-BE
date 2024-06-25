// import express
const express = require("express");
// import salaryController
const salaryController = require("../controllers/salaryController");
// import middleware
const auth = require("../middleware/auth");

const salaryRouter = express.Router();

// create routes
salaryRouter.get('/allSalary',salaryController.getAllSalary);
salaryRouter.post('/', salaryController.createSalary);
salaryRouter.get('/:salaryId', salaryController.getSalaryBySalaryId);
salaryRouter.put('/:salaryId', salaryController.updateSalary);
salaryRouter.delete('/:salaryId', salaryController.deleteSalary);

// export router
module.exports = salaryRouter;