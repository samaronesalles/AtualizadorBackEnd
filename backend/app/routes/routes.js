const express = require("express");
const routes = express.Router();

const userController = require('../controllers/UsersController');

routes.get('/users', userController.getUsers);                // Testado: OK
routes.get('/users/:user_id', userController.getUser);        // Testado: OK

routes.post('/users', userController.postUser);               // Testado: OK
routes.delete('/users/:user_id', userController.deleteUser);  // Testado: OK
routes.put('/users/:user_id', userController.putUser);        // Testado: OK

module.exports = routes;