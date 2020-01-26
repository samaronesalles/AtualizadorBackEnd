const usuarioDAO = require('../models/usuarioDAO');

module.exports = {

    NewUser(req, res) {
        console.log('chegou em "controller>NewUser"');

        const dadosUser = req.body;

        const modelUsuario = new usuarioDAO;
        modelUsuario.SaveUser(dadosUser, req, res);

        return res.json(res);
    },

};