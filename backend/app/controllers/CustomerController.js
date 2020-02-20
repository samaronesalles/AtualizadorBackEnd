const CheckCustomer = require('./validations/Customers');
const Customer = require('../models/Customer');
const Address = require('../models/Address');
const City = require('../models/City');
const Module = require('../models/Module');
const TypesUpdate = require('../models/TypesUpdate');

const attributes_Customer = ['id', 'company_name', 'cnpj', 'fancy_name', 'nick_name', 'phone', 'in_update'];
const attributes_Address = ['address', 'number', 'zip_code'];
const attributes_City = ['name', 'state', 'ibge_code'];
const attributes_Module = ['id', 'description'];

module.exports = {

    async getCustomers(req, res) {               // Testado: OK
        console.log('chegou em "controller>CustomerController.getCustomers"');

        const customers = await Customer.findAll({
            attributes: attributes_Customer,
            include: [
                {
                    model: TypesUpdate,
                    attributes: ['id', 'description']
                },
                {
                    model: Module,
                    attributes: attributes_Module,
                    through: {
                        attributes: []
                    },
                },
                {
                    model: Address,
                    attributes: attributes_Address,
                    through: {
                        attributes: []
                    },
                    include: {
                        model: City,
                        attributes: attributes_City
                    },
                },
            ]
        });

        return res.json(customers);
    },

    async getCustomer(req, res) {                // Testado: OK
        console.log('chegou em "controller>CustomerController.getCustomer"');

        try {
            let { cnpj } = req.params;

            if (!cnpj)
                throw new Error("cnpj param is required.");

            const customers = await Customer.findOne(
                {
                    where: {
                        cnpj: cnpj
                    },
                    attributes: attributes_Customer,
                    include: [
                        {
                            model: TypesUpdate,
                            attributes: ['id', 'description']
                        },
                        {
                            model: Module,
                            attributes: attributes_Module,
                            through: {
                                attributes: []
                            },
                        },
                        {
                            model: Address,
                            attributes: attributes_Address,
                            through: {
                                attributes: []
                            },
                            include: {
                                model: City,
                                attributes: attributes_City
                            },
                        },
                    ]
                },
            );

            return res.json(customers);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async postCustomer(req, res) {               // Testado: OK
        console.log('chegou em "controller>CustomerController.postCustomer"');

        try {

            CheckCustomer(req, res);

            const req_customer = req.body;
            let city = {};
            const req_modules = req_customer.modules;

            let customer = await Customer.findOne({ where: { cnpj: req_customer.cnpj } })

            if (customer)
                throw new Error("The client is already exists on the server");

            /* #region  "Resolvendo Cidade do endereço" */
            if (req_customer.address) {

                if (req_customer.address.ibge_code) {
                    city = await City.findOne({ where: { ibge_code: req_customer.address.ibge_code } })
                } else {
                    city = await City.findOne({
                        where: {
                            name: req_customer.address.city,
                            state: req_customer.address.state
                        }
                    });
                }

                if (!city)
                    throw new Error("The city isn't registered on the server. Please contact the adm.");
            }
            /* #endregion */

            /* #region  "Resolvendo endereço do cliente" */
            let address = await Address.findOne({
                where: {
                    address: req_customer.address.address,
                    number: req_customer.address.number,
                    zip_code: req_customer.address.zip_code,
                    city_id: city.id,
                }
            });

            if (!address) {
                address = req_customer.address;
                address['city_id'] = city.id;

                address = await Address.create(address);
            }
            /* #endregion */

            /* #region  "Resolvendo o cadastro do tipo de atualizacao" */
            const { type_update } = req_customer;

            if (type_update) {
                const [type] = await TypesUpdate.findOrCreate({
                    where: {
                        description: type_update,
                    }
                })

                if (type.dataValues.id > 0) {
                    req_customer['type_update_id'] = type.dataValues.id;
                }
            }
            /* #endregion */

            if (req_modules)
                delete req_customer.modules;

            customer = await Customer.create(req_customer);

            /* #region  "Vinculando Endereço e Modulos do cliente" */
            await address.addCustomer(customer);

            if (req_modules) {
                for (let mod of req_modules) {
                    let [newmod] = await Module.findOrCreate({ where: { description: mod } });

                    if (newmod.dataValues.id > 0) {
                        await newmod.addCustomer(customer);
                    }
                }
            }
            /* #endregion */

            /* #region  "Montando retorno dos dados" */
            const id = customer.id;

            customer = await Customer.findByPk(id, {
                attributes: attributes_Customer,
                include: [
                    {
                        model: TypesUpdate,
                        attributes: ['id', 'description']
                    },
                    {
                        model: Module,
                        attributes: attributes_Module,
                        through: {
                            attributes: []
                        },
                    },
                    {
                        model: Address,
                        attributes: attributes_Address,
                        through: {
                            attributes: []
                        },
                        include: {
                            model: City,
                            attributes: attributes_City
                        },
                    },
                ]
            });
            /* #endregion */

            return res.json(customer);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        };

    },

    async getVersionCompare(req, res) {          // Testado: OK
        console.log('chegou em "controller>CustomerController.getVersionCompare"');

        const { cnpj } = req.params
        console.log('CNPJ ' + cnpj);

        // 1- Verificar na clasula where se a empresa esta ativa para atualização posteriormente
        // 2- retornar versoes vazias para cada modulo se não possui retorno do banco

        // 3- passando formato de retorno fixo para teste
        return res.json({
            lbcpdv: {
                version: '35.74',
                path: 'http://192.168.2.150:8088/lastversion.zip'
            },
            lbcaut: { version: '', path: '' },
            lbcmed: { version: '', path: '' },
            lbcsyncpdv: { version: '', path: '' },
            lbcsyncmed: { version: '', path: '' }
        });
    },

    async deleteCustomer(req, res) {             // Testado: OK
        console.log('chegou em "controller>CustomerController.deleteCustomer"');

        try {
            const { cnpj } = req.params;
            const customer = await Customer.findOne({
                where: {
                    cnpj: cnpj,
                }
            });

            if (!customer)
                throw new Error("Customer not found TO DELETE");

            await customer.destroy({
                where: {
                    cnpj: cnpj,
                }
            });


        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.json({});
    },

    async putCustomer(req, res) {                // Testado: OK
        console.log('chegou em "controller>UsersController.putUser"');

        try {
            CheckCustomer(req, res);

            const { cnpj } = req.params;

            let customer = await Customer.findOne({
                where: {
                    cnpj: cnpj
                },
                include: [
                    { model: Address },
                    {
                        model: Module,
                        through: {
                            attributes: []
                        },
                    },
                ]
            });

            if (!customer)
                throw new Error("Customer not found TO UPDATE");

            const custumer_id = customer.id;
            const newModules = req.body.modules;

            /* #region  "Resolvendo cidade do endereço" */
            if (req.body.address) {

                if (req.body.address.ibge_code) {
                    city = await City.findOne({ where: { ibge_code: req.body.address.ibge_code } })
                } else {
                    city = await City.findOne({
                        where: {
                            name: req.body.address.city,
                            state: req.body.address.state
                        }
                    });
                }

                if (!city)
                    throw new Error("The city isn't registered on the server. Please contact the adm.");
            }

            /* #endregion */

            /* #region  "Resolvendo endereço do cliente" */
            let address = await Address.findOne({
                where: {
                    address: req.body.address.address,
                    number: req.body.address.number,
                    zip_code: req.body.address.zip_code,
                    city_id: city.id,
                }
            });

            if (!address) {
                address = req.body.address;
                address['city_id'] = city.id;

                address = await Address.create(address);
            }
            /* #endregion */

            /* #region  "Resolvendo o cadastro do tipo de atualizacao" */
            const { type_update } = req.body;

            if (type_update) {
                const [type] = await TypesUpdate.findOrCreate({
                    where: {
                        description: type_update,
                    }
                })

                if (type.dataValues.id > 0) {
                    req.body['type_update_id'] = type.dataValues.id;
                }
            }
            /* #endregion */

            /* #region  "Vicnulando endereços e módulos" */
            const oldAdress = customer.Addresses;
            if (oldAdress)
                customer.removeAddress(oldAdress);

            const oldModels = customer.Modules;
            if (oldModels)
                for (let mod of oldModels) {
                    mod.removeCustomer(customer);
                }

            if (newModules)
                for (let mod of newModules) {
                    let [newmod] = await Module.findOrCreate({ where: { description: mod } });

                    if (newmod.dataValues.id > 0) {
                        await newmod.addCustomer(customer);
                    }
                }
            /* #endregion */

            await customer.update(req.body, {
                where: {
                    id: custumer_id
                },
                returning: true,
                plain: true
            });

            await address.addCustomer(customer);

            /* #region  "Montando retorno" */
            customer = await Customer.findByPk(custumer_id, {
                attributes: attributes_Customer,
                include: [
                    {
                        model: TypesUpdate,
                        attributes: ['id', 'description']
                    },
                    {
                        model: Module,
                        attributes: attributes_Module,
                        through: {
                            attributes: []
                        },
                    },
                    {
                        model: Address,
                        attributes: attributes_Address,
                        through: {
                            attributes: []
                        },
                        include: {
                            model: City,
                            attributes: attributes_City
                        },
                    },
                ]
            });
            /* #endregion */

            return res.json(customer);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        };
    }
};
