const express = require("express");
const routes = express.Router();

const userController = require('../controllers/usuario');

routes.get('/users', (req, res) => {
    res.send('entrou na rota /users');
});

routes.get('/user_byId', (req, res) => {
    res.send('entrou na rota /user_byId');
});

routes.post('/user', userController.NewUser);

module.exports = routes;