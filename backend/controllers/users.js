const userDAO = require('../models/usersDAO');

module.exports = {

    async getUsers(req, res) {      // Testado: OK
        console.log('chegou em "controller>getUsers"');

        const modelUsuer = await new userDAO;
        const users = await modelUsuer.ReadUsers(req, res);

        return res.json(users);
    },

    async getUser(req, res) {       // Testado: OK
        console.log('chegou em "controller>getUser"');

        const modelUsuer = await new userDAO;
        const user = await modelUsuer.ReadUser(req, res);

        return res.json(user);
    },

    async postUser(req, res) {      // Testado: OK
        console.log('chegou em "controller>postUser"');

        const modelUsuer = await new userDAO;
        const dadosUser = await modelUsuer.CreateUser(req.body, res);

        return res.json(dadosUser);
    },

    async deleteUser(req, res) {    // Testado: OK
        console.log('chegou em "controller>deleteUser"');

        const modelUsuer = await new userDAO;
        await modelUsuer.DeleteUser_ById(req, res);

        return res.send('deleted successfully');
    },

    async putUser(req, res) {       // Testado: OK
        console.log('chegou em "controller>putUser"');

        const modelUsuer = await new userDAO;
        const user = await modelUsuer.UpdateUser(req, res);

        return res.json(user);
    },

};