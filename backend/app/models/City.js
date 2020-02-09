const { Model, DataTypes } = require('sequelize');

class City extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            ibge_code: DataTypes.INTEGER,
            state: DataTypes.STRING,
        }, {
            sequelize
        });
    };

    static associate(models) {
        this.hasMany(models.Address);
    }

}

module.exports = City;
