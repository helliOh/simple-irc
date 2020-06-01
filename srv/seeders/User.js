'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [
      {
        realname : '정용석',
        nickname : 'vgb0332'
      },
      {
        realname : '오주영',
        nickname : 'devHelli'
      },
      {
        realname : '전재현',
        nickname : 'zhenDaePyo'
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
