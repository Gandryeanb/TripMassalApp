'use strict';
module.exports = (sequelize, DataTypes) => {
  var Guide = sequelize.define('Guide', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER
  }, {});
  Guide.associate = function(models) {
    // associations can be defined here
  };
  return Guide;
};