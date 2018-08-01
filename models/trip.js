'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trip = sequelize.define('Trip', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
  };
  return Trip;
};