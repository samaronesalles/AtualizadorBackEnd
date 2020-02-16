const CheckVersion = require('./validations/Version');
const Versions = require('../models/Version');
const Module = require('../models/Module');
const attributes_Version = ['id', 'number', 'letter', 'createdAt', 'updatedAt'];
const attributes_Module = ['id', 'description'];

module.exports = {

    async getVersions(req, res) {       // Testado: OK
        console.log('chegou em "controller>VersionController.getVersions"');

        try {

            const versions = await Versions.findAll({
                attributes: attributes_Version,
                include: {
                    model: Module,
                    attributes: attributes_Module
                }
            });

            return res.json(versions);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getVersion(req, res) {        // Testado: OK
        console.log('chegou em "controller>VersionController.getVersion"');

        try {

            const { version_id } = req.params;

            if (!version_id)
                throw new Error("Param 'version_id' is required");

            const version = await Versions.findByPk(version_id, {
                attributes: attributes_Version,
                include: {
                    model: Module,
                    attributes: attributes_Module
                }
            });

            if (!version)
                throw new Error("version not found.");

            return res.json(version);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async postVersion(req, res) {       // Testado: OK
        console.log('chegou em "controller>VersionController.postVersion"');

        try {

            CheckVersion(req, res);

            const { module } = req.body;

            if (module) {
                const [new_module] = await Module.findOrCreate({
                    where: {
                        description: module,
                    }
                })

                if (new_module.dataValues.id > 0) {
                    req.body['module_id'] = new_module.dataValues.id;
                }
            }

            // carregar aqui o arquivo e salvar no disco, atualizando o <caminho className=""></caminho>
            req.body['file_path'] = 'C:/Versions';

            let version = await Versions.create(req.body);
            version = await Versions.findByPk(version.id, {
                attributes: attributes_Version,
                include: {
                    model: Module,
                    attributes: attributes_Module
                }
            });

            return res.json(version);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async deleteVersion(req, res) {     // Testado: OK
        console.log('chegou em "controller>VersionController.deleteVersion"');

        try {

            const { version_id } = req.params;

            if (!version_id)
                throw new Error("Param 'version_id' is required");

            await Versions.destroy({
                where: {
                    id: version_id,
                }
            });

            return res.json({});

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async putVersion(req, res) {        // Testado: OK
        console.log('chegou em "controller>VersionController.putVersion"');

        try {

            const { version_id } = req.params;
            let version = await Versions.findByPk(version_id);

            if (!version)
                throw new Error("Version not found TO UPDATE");

            CheckVersion(req, res);

            const { module } = req.body;

            if (module) {
                const [new_module] = await Module.findOrCreate({
                    where: {
                        description: module,
                    }
                })

                if (new_module.dataValues.id > 0) {
                    req.body['module_id'] = new_module.dataValues.id;
                }
            }

            // carregar aqui o arquivo e salvar no disco, atualizando o <caminho className=""></caminho>
            req.body['file_path'] = 'C:/Versions';

            await version.update(req.body, {
                where: {
                    id: version_id
                },
                returning: true,
                plain: true
            });

            version = await Versions.findByPk(version_id, {
                attributes: attributes_Version,
                include: {
                    model: Module,
                    attributes: attributes_Module
                }
            });

            return res.json(version);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

}