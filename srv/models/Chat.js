'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    text : DataTypes.STRING,
    attachment : DataTypes.STRING
  }, { timestamps: true });
  
  Chat.associate = function(models) {
    Chat.hasOne(models.Chat, {as : 'Feed', foreignKey : 'ChatId' });
    Chat.belongsTo(models.Room, {as : 'Room', foreignKey : 'RoomId' });
    Chat.belongsTo(models.User, {as : 'Sender', foreignKey : 'UserId' });
  };

  return Chat;
};
