const User = require('../models/User');

module.exports = {

    async getUsers(req, res) {      // Testado: OK
        console.log('chegou em "controller>UsersController.getUsers"');

        const users = await User.findAll();
        return res.json(users);
    },

    async getUser(req, res) {       // Testado: OK
        console.log('chegou em "controller>UsersController.getUser"');

        const { user_id } = req.params;
        const user = await User.findByPk(user_id);

        return res.json(user);
    },

    async postUser(req, res) {      // Testado: OK
        console.log('chegou em "controller>UsersController.postUser"');

        const user = await User.create(req.body);
        return res.json(user);
    },

    async deleteUser(req, res) {    // Testado: OK
        console.log('chegou em "controller>UsersController.deleteUser"');

        const { user_id } = req.params;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found TO DELETE' });
        }

        await user.destroy({
            where: {
                id: user_id,
            }
        });

        return res.json();
    },

    async putUser(req, res) {       // Testado: OK
        console.log('chegou em "controller>UsersController.putUser"');

        const { user_id } = req.params;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found TO UPDATE' });
        }

        await user.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, {
            where: {
                id: user_id
            },
            returning: true,
            plain: true
        });

        return res.json(user);
    },

};