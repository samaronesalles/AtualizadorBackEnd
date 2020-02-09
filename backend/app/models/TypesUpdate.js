const { Model, DataTypes } = require('sequelize');

class TypesUpdate extends Model {

    static init(sequelize) {
        super.init({
            description: DataTypes.STRING,
        }, {
            tableName: 'types_update',
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Customers);
    }

}

module.exports = TypesUpdate;