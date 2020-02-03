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
        this.belongsTo(models.User, { foreignKey: 'id', as: 'users' });
    }

}

module.exports = Department;