const express = require("express");
const routes = express.Router();

const userController = require('../controllers/UsersController');
const departmentController = require('../controllers/DepartmentsController');

// Users
routes.get('/users', userController.getUsers);                                              // Testado: OK
routes.get('/users/:user_id', userController.getUser);                                      // Testado: OK
routes.post('/users', userController.postUser);                                             // Testado: OK
routes.delete('/users/:user_id', userController.deleteUser);                                // Testado: OK
routes.put('/users/:user_id', userController.putUser);                                      // Testado: OK

// Departments
routes.get('/departments', departmentController.getDepartments);                            // Testado: OK
routes.post('/departments', departmentController.postDepartment);                           // Testado: OK
routes.get('/departments/:department_name', departmentController.getDepartment);            // Testado: OK
routes.delete('/departments/:department_id', departmentController.deleteDepartment);        // Testado: OK
routes.put('/departments/:department_id', departmentController.putDepartment);              // Testado: OK

module.exports = routes;