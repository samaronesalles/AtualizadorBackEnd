const Modules = require('../models/Module');

module.exports = {

    async getModules(req, res) {       // Testado: OK
        console.log('chegou em "controller>ModuleController.getModules"');

        try {

            const Mods = await Modules.findAll();

            return res.json(Mods);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getModule(req, res) {        // Testado: OK
        console.log('chegou em "controller>ModuleController.getModule"');

        try {

            const { module_id } = req.params;

            if (!module_id)
                throw new Error("Param 'module_id' is required");

            const mod = await Modules.findByPk(module_id);

            if (!mod)
                throw new Error("module not found.");

            return res.json(mod);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async postModule(req, res) {       // Testado: OK
        console.log('chegou em "controller>ModuleController.postModule"');

        try {

            const { description } = req.body;

            if (!description)
                throw new Error("field 'description' is required.");

            let mod = await Modules.create(req.body);

            return res.json(mod);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async deleteModule(req, res) {     // Testado: OK
        console.log('chegou em "controller>ModuleController.deleteModule"');

        try {

            const { module_id } = req.params;

            if (!module_id)
                throw new Error("Param 'module_id' is required");

            await Modules.destroy({
                where: {
                    id: module_id,
                }
            });

            return res.json({});

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async putModule(req, res) {        // Testado: OK
        console.log('chegou em "controller>ModuleController.putModule"');

        try {

            const { module_id } = req.params;

            if (!module_id)
                throw new Error("Param 'module_id' is required");

            const mod = await Modules.findByPk(module_id);

            if (!mod)
                throw new Error("module not found to UPDATE.");

            await mod.update(req.body, {
                where: {
                    id: module_id
                },
                returning: true,
                plain: true
            });

            return res.json(mod);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

}