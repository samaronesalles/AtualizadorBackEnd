const Department = require('../models/Department');

module.exports = {

    async getDepartments(req, res) {      // Testado: OK
        console.log('chegou em "controller>DepartmentsController.getDepartments"');

        const departments = await Department.findAll();
        return res.json(departments);
    },

    async getDepartment(req, res) {       // Testado: OK
        console.log('chegou em "controller>DepartmentsController.getDepartment"');

        const { department_name } = req.params;
        const department = await Department.findAll({
            where: {
                name: department_name
            }
        });

        return res.json(department);
    },

    async postDepartment(req, res) {      // Testado: OK
        console.log('chegou em "controller>DepartmentsController.postDepartment"');

        const [department, created] = await Department.findOrCreate({
            where: { name: req.body.name },
        });

        return res.json(department);
    },

    async deleteDepartment(req, res) {    // Testado: OK
        console.log('chegou em "controller>DepartmentsController.deleteDepartment"');

        const { department_id } = req.params;
        const department = await Department.findByPk(department_id);

        if (!department) {
            return res.status(400).json({ error: 'Department not found TO DELETE' });
        }

        await department.destroy({
            where: {
                id: department_id,
            }
        });

        return res.json({});
    },

    async putDepartment(req, res) {       // Testado: OK
        console.log('chegou em "controller>DepartmentsController.putDepartment"');

        const { department_id } = req.params;
        const department = await Department.findByPk(department_id);

        if (!department) {
            return res.status(400).json({ error: 'Department not found TO UPDATE' });
        }

        await department.update(req.body, {
            where: {
                id: department_id
            },
            returning: true,
            plain: true
        });

        return res.json(department);
    },

};