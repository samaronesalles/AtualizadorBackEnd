const { Model, DataTypes } = require('sequelize');

class Modules extends Model {

    static init(sequelize) {
        super.init({
            description: DataTypes.STRING,
        }, {
            sequelize
        });
    };

    static associate(models) {
        this.belongsToMany(models.Customer, { foreignKey: 'module_id', through: 'purchased_modules' });
        this.hasMany(models.Version);
    }
}

module.exports = Modules;
