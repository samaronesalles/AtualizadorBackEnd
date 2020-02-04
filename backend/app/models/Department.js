const { Model, DataTypes } = require('sequelize');

class Department extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.User);
    }

}

module.exports = Department;