'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trip = sequelize.define('Trip', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {});
  Trip.associate = function(models) {
    const user = models.User
    Trip.belongsToMany(user, {through:'UserTrip',foreignKey:'tripId'})
  };
  return Trip;
};