'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('types_update',
      [
        { description: "Crítico", created_at: new Date(), updated_at: new Date() },
        { description: "Moderado", created_at: new Date(), updated_at: new Date() },
        { description: "Leve", created_at: new Date(), updated_at: new Date() },
      ], {

    }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types_update', null, {});
  }
};
