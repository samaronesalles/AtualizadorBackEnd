const { Model, DataTypes } = require('sequelize');

class Version extends Model {

    static init(sequelize) {
        super.init({
            number: DataTypes.INTEGER,
            letter: DataTypes.STRING,
            module_id: DataTypes.INTEGER,
            file_path: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Modules, { foreignKey: 'module_id' });
    }

}

module.exports = Version;