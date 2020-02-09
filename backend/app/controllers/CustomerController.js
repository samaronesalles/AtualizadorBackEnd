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

    async postCustomer(req, res) {               // Testado: OK
        console.log('chegou em "controller>CustomerController.postCustomer"');

        try {

            const req_customer = req.body;
            let city = {};

            /* #region  "Resolvendo validações" */
            if (!req_customer.company_name)
                throw new Error("field 'company_name' is required.");

            if (!req_customer.cnpj)
                throw new Error("field 'cnpj' is required.");

            if (!req_customer.in_update)
                throw new Error("field 'in_update' is required.");

            if (!req_customer.address)
                throw new Error("field 'address' is required.")
            else {

                if (!req_customer.address.address)
                    throw new Error("field 'address.address' is required.");

                if (!req_customer.address.number)
                    throw new Error("field 'address.address' is required.");

                if (!req_customer.address.zip_code)
                    throw new Error("field 'address.zip_code' is required.");

                if (req_customer.address.ibge_code) {
                    city = await City.findOne({ where: { ibge_code: req_customer.address.ibge_code } })
                } else {
                    if (!req_customer.address.city)
                        throw new Error("field 'address.city' is required.");

                    if (!req_customer.address.state)
                        throw new Error("field 'address.state' is required.");

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

            /* #region  "Resolvendo o cadastro do cliente" */
            delete req_customer.address;
            let [customer] = await Customer.findOrCreate({
                where: req_customer,
            });
            /* #endregion */

            const id = customer.id;
            await address.addCustomer(customer);

            // Retornando...
            customer = await Customer.findByPk(id, {
                attributes: attributes_Customer,
                include: {
                    model: Address,
                    attributes: attributes_Address,
                    through: {
                        attributes: []
                    },
                    include: {
                        model: City,
                        attributes: attributes_City
                    }
                }
            });

            return res.json(customer);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        };

    },

    async getVersionCompare(req, res) {
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

};
