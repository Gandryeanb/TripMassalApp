'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserTrip = sequelize.define('UserTrip', {
    userId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER,
    statusInvoice: DataTypes.BOOLEAN,
    dueDatePayment: DataTypes.DATE
  }, {});
  UserTrip.associate = function(models) {
    // associations can be defined here
  };
  return UserTrip;
};