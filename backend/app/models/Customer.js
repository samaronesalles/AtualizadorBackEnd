const { Model, DataTypes } = require('sequelize');

class Customer extends Model {

    static init(sequelize) {
        super.init({
            company_name: DataTypes.STRING,
            cnpj: DataTypes.STRING,
            fancy_name: DataTypes.STRING,
            nick_name: DataTypes.STRING,
            phone: DataTypes.STRING,
            in_update: DataTypes.BOOLEAN,
        }, {
            sequelize
        });
    };

    static associate(models) {
        this.belongsToMany(models.Address, { foreignKey: 'customer_id', through: 'customer_address' });
    }

}

module.exports = Customer;
