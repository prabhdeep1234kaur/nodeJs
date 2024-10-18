const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

router.route('/') //chaining the http methods : code will be different in future
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

//paramtere : get request with paramterer
router.route('/:id')
    .get(employeesController.getEmployee);


module.exports  = router;
