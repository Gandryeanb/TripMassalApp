'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    const trip = models.Trip
    User.belongsToMany(trip, {through:'UserTrip',foreignKey:'userId'})
  };
  return User;
};