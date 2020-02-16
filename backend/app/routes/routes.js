const express = require("express");
const routes = express.Router();

const userController = require('../controllers/UsersController');
const departmentController = require('../controllers/DepartmentsController');
const customerController = require('../controllers/CustomerController');
const TypesUpdateController = require('../controllers/TypesUpdateController');
const ModuleController = require('../controllers/ModuleController');
const VersionController = require('../controllers/VersionController');

// Users
routes.get('/users', userController.getUsers);                                              // Testado: OK
routes.get('/users/:user_id', userController.getUser);                                      // Testado: OK
routes.get('/user_login/authenticate/', userController.getAuthenticateLogin);               // Testado: 
routes.post('/users', userController.postUser);                                             // Testado: OK
routes.delete('/users/:user_id', userController.deleteUser);                                // Testado: OK
routes.put('/users/:user_id', userController.putUser);                                      // Testado: OK

// Departments
routes.get('/departments', departmentController.getDepartments);                            // Testado: OK
routes.post('/departments', departmentController.postDepartment);                           // Testado: OK
routes.get('/departments/:department_name', departmentController.getDepartment);            // Testado: OK
routes.delete('/departments/:department_id', departmentController.deleteDepartment);        // Testado: OK
routes.put('/departments/:department_id', departmentController.putDepartment);              // Testado: OK

// Customers
routes.get('/customers', customerController.getCustomers);                                  // Testado: OK
routes.get('/customers/:cnpj', customerController.getCustomer);                             // Testado: OK
routes.get('/customers/:cnpj/modules', customerController.getVersionCompare);               // Testado: OK
routes.post('/customers', customerController.postCustomer);                                 // Testado: OK
routes.delete('/customers/:cnpj', customerController.deleteCustomer);                       // Testado: OK
routes.put('/customers/:cnpj', customerController.putCustomer);                             // Testado: OK

// Types update
routes.get('/typesupdate', TypesUpdateController.getTypesUpdate);                           // Testado: OK
routes.get('/typesupdate/:type_id', TypesUpdateController.getTypeUpdate);                   // Testado: OK
routes.post('/typesupdate', TypesUpdateController.postTypesUpdate);                         // Testado: OK
routes.delete('/typesupdate/:type_id', TypesUpdateController.deleteTypesUpdate);            // Testado: OK
routes.put('/typesupdate/:type_id', TypesUpdateController.putTypesUpdate);                  // Testado: OK

// Modules
routes.get('/modules', ModuleController.getModules);                                        // Testado: OK
routes.get('/modules/:module_id', ModuleController.getModule);                              // Testado: OK
routes.post('/modules', ModuleController.postModule);                                       // Testado: OK
routes.delete('/modules/:module_id', ModuleController.deleteModule);                        // Testado: OK
routes.put('/modules/:module_id', ModuleController.putModule);                              // Testado: OK

// Versions
routes.get('/versions', VersionController.getVersions);                                     // Testado: OK
routes.get('/versions/:version_id', VersionController.getVersion);                          // Testado: OK
routes.post('/versions', VersionController.postVersion);                                    // Testado: OK
routes.delete('/versions/:version_id', VersionController.deleteVersion);                    // Testado: OK
routes.put('/versions/:version_id', VersionController.putVersion);                          // Testado: OK

module.exports = routes;