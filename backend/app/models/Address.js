const { Model, DataTypes } = require('sequelize');

class Address extends Model {

    static init(sequelize) {
        super.init({
            address: DataTypes.STRING,
            number: DataTypes.STRING,
            zip_code: DataTypes.STRING,
        }, {
            sequelize
        });
    };

    static associate(models) {
        this.belongsTo(models.City, { foreignKey: 'city_id' });
        this.belongsToMany(models.Customer, { foreignKey: 'address_id', through: 'customer_address' });
    };

}

module.exports = Address;
