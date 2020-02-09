'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.addColumn(
        'customers',
        'type_update_id',
        {
          type: Sequelize.INTEGER,
          allowNull: null,
          references: { model: 'types_update', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          after: 'in_update',
        },
        { transaction }
      );

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }

  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn('customers', 'type_update_id', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }

  },
};