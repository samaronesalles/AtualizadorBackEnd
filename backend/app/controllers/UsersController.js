const CheckUser = require('./validations/Users');
const User = require('../models/User');
const Department = require('../models/Department');
const Crypt = require('../Utils/encryption.js');
const attributes_Users = ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'];
const attributes_Departments = ['id', 'name'];

module.exports = {

    async getUsers(req, res) {      // Testado: OK
        console.log('chegou em "controller>UsersController.getUsers"');

        try {

            const users = await User.findAll({
                attributes: attributes_Users,
                include: {
                    model: Department,
                    attributes: attributes_Departments
                }
            });

            return res.json(users);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async getUser(req, res) {       // Testado: OK
        console.log('chegou em "controller>UsersController.getUser"');

        const { user_id } = req.params;

        try {

            if (!user_id)
                throw new Error("user index is required.");

            const user = await User.findByPk(user_id, {
                attributes: attributes_Users,
                include: {
                    model: Department,
                    attributes: attributes_Departments
                }
            });

            if (!user)
                throw new Error("user not found.");

            // let pass = user.password;
            // pass = Crypt.decrypt(pass);

            // user['password'] = pass;

            return res.json(user);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async postUser(req, res) {      // Testado: OK
        console.log('chegou em "controller>UsersController.postUser"');

        try {

            const { name, email, password, department } = req.body;

            CheckUser(req, res);

            const user_temp = await User.findOne({ where: { email: email } });

            if (user_temp) {
                throw new Error("user email already registered.");
            }

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

            let user = await User.create(req.body);
            user = await User.findByPk(user.id, {
                attributes: attributes_Users,
                include: {
                    model: Department,
                    attributes: attributes_Departments
                }
            });

            return res.json(user);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async deleteUser(req, res) {    // Testado: OK
        console.log('chegou em "controller>UsersController.deleteUser"');

        try {
            const { user_id } = req.params;
            const user = await User.findByPk(user_id);

            if (!user)
                throw new Error("User not found TO DELETE");

            await user.destroy({
                where: {
                    id: user_id,
                }
            });


        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.json({});
    },

    async putUser(req, res) {       // Testado: OK
        console.log('chegou em "controller>UsersController.putUser"');

        try {

            const { user_id } = req.params;
            let user = await User.findByPk(user_id);

            if (!user)
                throw new Error("User not found TO UPDATE");

            const { name, email, password, department } = req.body;

            CheckUser(req, res);

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

            let pass = password;
            if (pass) {
                pass = Crypt.encrypt(pass);
                req.body['password'] = pass;
            }

            await user.update(req.body, {
                where: {
                    id: user_id
                },
                returning: true,
                plain: true
            });

            user = await User.findByPk(user_id, {
                attributes: attributes_Users,
                include: {
                    model: Department,
                    attributes: attributes_Departments
                }
            });

            return res.json(user);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        };

    },

};