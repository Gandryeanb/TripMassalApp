'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('Invoice', {
    planTripId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  Invoice.associate = function(models) {
    const userTrip = models.UserTrip
    Invoice.belongsTo(userTrip,{foreignKey:'planTripId'})
  };
  return Invoice;
};