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
    const user = models.User
    const trip = models.Trip
    const invoice = models.Invoice
    UserTrip.belongsTo(user,{foreignKey:'userId'})
    UserTrip.belongsTo(trip,{foreignKey:'tripId'})
    UserTrip.belongsTo(invoice,{foreignKey:'invoiceId'})
  };
  return UserTrip;
};