'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Room', [
      {
        socketId : 'randomHash-0',
      },
      {
        socketId : 'randomHash-1',
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Room', null, {});
  }
};
