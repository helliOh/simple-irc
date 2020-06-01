'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
  }, { timestamps: true });
  
  Friend.associate = function(models) {
    Friend.belongsTo(models.User, {as : 'Owner', foreignKey : 'OwnerId'});
    Friend.belongsTo(models.User, {as : 'Friend', foreignKey: 'FriendId'});
  };

  return Friend;
};
