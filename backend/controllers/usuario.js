const usuarioModel = require('../models/usuarioDAO');

module.exports = {

    NewUser(req, res) {
        const dadosUser = req.body;
        console.log(dadosUser);

        usuarioModel.prototype.SaveUser(dadosUser);

        return res.json({ resultado: "Sucesso" });
    },

};