const models = require('../models')
const users = models.User
const trips = models.Trip
const userTrips = models.UserTrip
const invoices = models.Invoice

class Helper {
    static balanceChecker(req, res, next) {
        const input = {
            desination: req.body.id,
            date: req.body.date
        }
        trips.findOne({
                where: {
                    id: input.desination
                }
            })
            .then(data => {
                if (data.price > req.session.user.balance) {
                    res.redirect('/user')
                } else {
                    users.findOne({
                            where: {
                                id: req.session.user.id
                            }
                        })
                        .then(dataUser => {
                            let balanceUpdater = dataUser.balance - data.price
                            users.update({
                                    balance: balanceUpdater
                                }, {
                                    where: {
                                        id: req.session.user.id
                                    }
                                })
                                .then(finalData => {
                                    req.session.user.balance = finalData.balance
                                    next()
                                })
                        })
                }
            })
    }
}

module.exports = Helper