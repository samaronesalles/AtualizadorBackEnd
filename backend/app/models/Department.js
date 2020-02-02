const { Model, DataTypes } = require('sequelize');

class Department extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    // static associate(models) {
    //     this.belongsTo(models.User, { foreignKey: 'department_id', as: 'department_user' });
    // }

}

module.exports = Department;