'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('versions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      number: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      letter: {
        allowNull: true,
        type: DataTypes.STRING(1),
      },
      module_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'modules', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      file_path: {
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
    }, {
      uniqueKeys: {
        unique_keys: {
          customIndex: true,
          fields: ['number', 'letter', 'module_id']
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('versions');
  }
};