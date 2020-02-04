const User = require('../models/User');
const Department = require('../models/Department');
const Crypt = require('../Utils/encryption.js');

module.exports = {

    async getUsers(req, res) {      // Testado: OK
        console.log('chegou em "controller>UsersController.getUsers"');

        const users = await User.findAll({
            include: {
                model: Department
            }
        });

        return res.json(users);
    },

    async getUser(req, res) {       // Testado: OK
        console.log('chegou em "controller>UsersController.getUser"');

        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: {
                model: Department
            }
        });

        // let pass = user.password;
        // pass = Crypt.decrypt(pass);

        // user['password'] = pass;

        return res.json(user);
    },

    async postUser(req, res) {      // Testado: OK
        console.log('chegou em "controller>UsersController.postUser"');

        const { email } = req.body;
        const user_temp = await User.findOne({ where: { email: email } });

        if (user_temp) {
            return res.status(400).json({ error: 'user email already registered.' });
        }

        const { department } = req.body;
        if (department) {
            if (department.name != '') {
                const [dep] = await Department.findOrCreate({
                    where: {
                        name: department.name,
                    }
                })

                if (dep.dataValues.id > 0) {
                    req.body['department_id'] = dep.dataValues.id;
                }
            }
        }

        let pass = req.body.password;
        pass = Crypt.encrypt(pass);

        req.body['password'] = pass;

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

        const { department } = req.body;
        if (department) {
            if (department.name != '') {
                const [dep] = await Department.findOrCreate({
                    where: {
                        name: department.name,
                    }
                })

                if (dep.dataValues.id > 0) {
                    req.body['department_id'] = dep.dataValues.id;
                }
            }
        }

        await user.update(req.body, {
            where: {
                id: user_id
            },
            returning: true,
            plain: true
        });

        return res.json(user);
    },

};