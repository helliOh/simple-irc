'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    realname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    thumbnail : DataTypes.STRING,
  }, { timestamps: true });
  
  User.associate = function(models) {
    User.hasMany(models.Friend, {as : 'Friends', foreignKey : 'FriendId'});
    User.hasMany(models.UserRoom, {as : 'Rooms', foreignKey: 'RoomId'});
  };

  return User;
};
