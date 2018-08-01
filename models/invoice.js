'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('Invoice', {
    planTripId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  Invoice.associate = function(models) {
    // associations can be defined here
  };
  return Invoice;
};