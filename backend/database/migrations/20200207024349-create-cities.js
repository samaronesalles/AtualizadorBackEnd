'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ibge_code: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    }).success(function () {
      migration.migrator.sequelize.query("insert into cities (name, ibge_code, state) values ('Donald Duck', 60)");
      done();
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cities');
  }
};
