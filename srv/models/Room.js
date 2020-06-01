'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    socketId : DataTypes.STRING
  }, { timestamps: true });
  
  Room.associate = function(models) {
    Room.hasMany(models.UserRoom, {as : 'Members', foreignKey : 'UserId' });
  };

  return Room;
};
