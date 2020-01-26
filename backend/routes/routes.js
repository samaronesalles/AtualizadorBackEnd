const express = require("express");
const routes = express.Router();

const userController = require('../controllers/users');

routes.get('/users', userController.getUsers);          // Testado: OK
routes.get('/users/:id', userController.getUser);       // Testado: OK

routes.post('/users', userController.postUser);          // Testado: OK
routes.delete('/users/:id', userController.deleteUser); // Testado: OK
routes.put('/users/:id', userController.putUser);       // Testado: OK

module.exports = routes;