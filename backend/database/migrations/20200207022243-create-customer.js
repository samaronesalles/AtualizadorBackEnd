'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      company_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cnpj: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      fancy_name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      nick_name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      in_update: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        default: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customers');
  }
};
