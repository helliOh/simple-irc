'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    appid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    developer : DataTypes.STRING,
    publisher : DataTypes.STRING,
    positive : DataTypes.STRING,
    negative : DataTypes.STRING,
    owners: DataTypes.STRING,
    average_forever: DataTypes.STRING
  }, { timestamps: true });
  
  Game.associate = function(models) {
    
  };

  return Game;
};
