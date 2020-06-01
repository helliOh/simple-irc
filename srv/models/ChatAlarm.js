'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatAlarm = sequelize.define('ChatAlarm', {
    check : DataTypes.BOOLEAN
  }, { timestamps: true });
  
  ChatAlarm.associate = function(models) {
    ChatAlarm.belongsTo(models.Room, {as : 'Room', foreignKey : 'RoomId' });
    ChatAlarm.belongsTo(models.User, {as : 'Receiver', foreignKey: 'UserId' });
  };

  return ChatAlarm;
};
