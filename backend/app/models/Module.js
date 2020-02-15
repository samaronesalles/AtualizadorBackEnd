const { Model, DataTypes } = require('sequelize');

class Modules extends Model {

    static init(sequelize) {
        super.init({
            description: DataTypes.STRING,
        }, {
            sequelize
        });
    };

}

module.exports = Modules;
