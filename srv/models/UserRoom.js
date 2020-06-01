'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRoom = sequelize.define('UserRoom', {
  }, { timestamps: true });
  
  UserRoom.associate = function(models) {
    UserRoom.belongsTo(models.User, {as : 'Member', foreignKey : 'UserId' });
    UserRoom.belongsTo(models.Room, {as : 'Room', foreignKey : 'RoomId' });
  };

  return UserRoom;
};
