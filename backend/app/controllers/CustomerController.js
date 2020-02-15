const CheckCustomer = require('./validations/Customers');
const Customer = require('../models/Customer');
const Address = require('../models/Address');
const City = require('../models/City');
const TypesUpdate = require('../models/TypesUpdate');
const attributes_Customer = ['id', 'company_name', 'cnpj', 'fancy_name', 'nick_name', 'phone', 'in_update'];
const attributes_Address = ['address', 'number', 'zip_code'];
const attributes_City = ['name', 'state', 'ibge_code'];

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

            const req_customer = req.body;
            let city = {};

            CheckCustomer(req, res);

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
            const { type_update } = req.body;

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

            /* #region  "Finalmente cadastrando o cliente" */
            let customer = await Customer.create(req_customer);
            /* #endregion */

            const id = customer.id;
            await address.addCustomer(customer);

            /* #region  "Montando retorno dos dados" */
            customer = await Customer.findByPk(id, {
                attributes: attributes_Customer,
                include: [
                    {
                        model: TypesUpdate,
                        attributes: ['id', 'description']
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

    async getVersionCompare(req, res) {          // Testado:
        console.log('chegou em "controller>CustomerController.getVersionCompare"');

        const { cnpj } = req.params
        console.log('CNPJ ' + cnpj);

        // 1- Verificar na clasula where se a empresa esta ativa para atualização posteriormente
        // 2- retornar versoes vazias para cada modulo se não possui retorno do banco

        // 3- passando formato de retorno fixo para teste
        return res.json({
            lbcpdv: {
                version: '35.70',
                path: 'http://192.168.2.161/lastversion.zip'
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

    async putCustomer(req, res) {                // Testado:
        console.log('chegou em "controller>UsersController.putUser"');

        try {

            const { cnpj } = req.params;
            let customer = await Customer.findOne({
                where: {
                    cnpj: cnpj
                },
                include: [
                    {
                        model: Address,
                    },
                ]
            });

            if (!customer)
                throw new Error("Customer not found TO UPDATE");

            const custumer_id = customer.id;

            CheckCustomer(req, res);

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
            const oldAdress = customer.Addresses;
            if (oldAdress)
                customer.removeAddress(oldAdress);

            await customer.update(req.body, {
                where: {
                    id: custumer_id
                },
                returning: true,
                plain: true
            });

            await address.addCustomer(customer);

            customer = await Customer.findByPk(custumer_id, {
                attributes: attributes_Customer,
                include: [
                    {
                        model: TypesUpdate,
                        attributes: ['id', 'description']
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

            return res.json(customer);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        };
    }
};
