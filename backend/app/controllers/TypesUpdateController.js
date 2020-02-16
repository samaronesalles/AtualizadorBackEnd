const CheckTypeUpdate = require('./validations/TypesUpdate');
const TypesUpdate = require('../models/TypesUpdate');

module.exports = {

    async getTypesUpdate(req, res) {      // Testado: OK
        console.log('chegou em "controller>TypesUpdateController.getTypesUpdate"');

        try {
            const types = await TypesUpdate.findAll();

            return res.json(types);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async getTypeUpdate(req, res) {       // Testado: OK
        console.log('chegou em "controller>TypesUpdateController.getTypeUpdate"');

        const { type_id } = req.params;

        try {
            CheckTypeUpdate.ValidParam(req, res);

            const type = await TypesUpdate.findByPk(type_id);

            if (!type)
                throw new Error("type of update not found.");

            return res.json(type);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async postTypesUpdate(req, res) {     // Testado: OK
        console.log('chegou em "controller>TypesUpdateController.postTypesUpdate"');

        try {

            const { description } = req.body;

            CheckTypeUpdate.ValidBody(req, res);

            const [type] = await TypesUpdate.findOrCreate({
                where: { description: description },
            });

            return res.json(type);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async deleteTypesUpdate(req, res) {   // Testado: OK
        console.log('chegou em "controller>TypesUpdateController.deleteTypesUpdate"');

        try {
            const { type_id } = req.params;
            const type = await TypesUpdate.findByPk(type_id);

            if (!type)
                throw new Error("Type of update not found TO DELETE");

            await TypesUpdate.destroy({
                where: {
                    id: type_id,
                }
            });

            return res.json({});

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async putTypesUpdate(req, res) {      // Testado: OK
        console.log('chegou em "controller>TypesUpdateController.putTypesUpdate"');

        try {

            CheckTypeUpdate.ValidParam(req, res);

            const { type_id } = req.params;
            const type = await TypesUpdate.findByPk(type_id);

            if (!type)
                throw new Error("Type of update not found TO UPDATE");

            const { description } = req.body;

            CheckTypeUpdate.ValidBody(req, res);

            await type.update(req.body, {
                where: {
                    id: type_id
                },
                returning: true,
                plain: true
            });

            return res.json(type);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        };

    },
};
