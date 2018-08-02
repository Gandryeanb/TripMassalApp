const crypto = require('crypto')
const models = require('../models')
const users = models.User
const trips = models.Trip
const userTrips = models.UserTrip
const invoices = models.Invoice

class ControllerUser {
    static home(req, res) {
        users.findOne({
            where:{
                email:req.session.user.email
            }
        })
        .then(data => {
            res.render('../views/user/home', {
                title:'User Page',
                header:'User Name',
                data:data
            })
        })
        
    }
    static edit(req, res) {
        res.render('../views/user/edit', {
            title:'User Edit Page',
            header:'User Edit Page'
        })
    }
    static editPost(req, res) {
        const encripted = crypto.createHash('md5').update(req.body.password + req.body.email).digest('hex')
        let data = {
            name:req.body.name,
            email:req.body.email,
            password: encripted
        }
        users.update(data,{
            where:{
                email:req.session.user.email
            }
        })
        .then(data => {
            req.session.user.email = req.body.email
            res.redirect('/user')
        })
    }
    static trip(req, res) {
        userTrips.findAll({
            include:[models.Invoice,models.Trip,models.User]
        })
        .then(dataTripUser => {
            trips.findAll()
            .then(dataTrip => {
                let dateDepature = []
                let dateDue = []
                for (let i= 0; i < dataTripUser.length; i++) {
                    var n = 4; 
                    var today = new Date(String(dataTripUser[i].dueDatePayment)); 
                    var requiredDatePlus = new Date(today.getFullYear(),today.getMonth(),today.getDate()+n)
                    var requiredDateMinus = new Date(today.getFullYear(),today.getMonth(),today.getDate())
                    let StringPlus = String(requiredDatePlus)
                    let StringMinus = String(requiredDateMinus)
                    dateDepature.push(StringPlus.slice(4,15))
                    dateDue.push(StringMinus.slice(4,15))
                }
                res.render('../views/user/trip', {
                    title:'Trip Page',
                    header:'Trip Page',
                    dataTripUser:dataTripUser,
                    dataTrip:dataTrip,
                    datePlus:dateDepature,
                    dateMnus:dateDue
                })
            })
        })
    }
    static topUp(req, res) { 
        res.render('../views/user/topup', {
            title:'Top up Page',
            header:'Top up Page'
        })
    }
    static topUpPost(req, res) {
        users.findOne({
            where:{
                email:req.session.user.email
            }
        })
        .then(data => {
            let balanceData = data.dataValues.balance
            let balanceUpdate = req.body.balance 
            let newBalance = Number(balanceData) + Number(balanceUpdate)
            users.update({balance:newBalance},{
                where:{
                    email:req.session.user.email
                }
            })
            .then(data => {
                res.redirect('/user')
            })
        })
    }
    static create(req, res) { //kurang POST
        const idTrip = req.params.id
        trips.findAll({
            where:{
                id:idTrip
            }
        })
        .then( data => {
            res.render('../views/user/create', {
                title:'Create party Page',
                header:'Create party Page',
                data:data
            })
        })
    }
    static creating(req, res) {
        const input = {
            desination: req.body.id,
            date: req.body.date
        }
        console.log(input.date);
        
        var n = 4; 
        var today = new Date(String(input.date)); 
        var requiredDate = new Date(today.getFullYear(),today.getMonth(),today.getDate()-n)
        let data = {
            userId:req.session.user.id, 
            tripId:req.body.id,
            statusInvoice: false,
            dueDatePayment: requiredDate
        }
        userTrips.create(data)
        .then(dataUserTrips => {
            trips.findOne({
                where:{
                    id : dataUserTrips.tripId
                }
            })
            .then(dataTrip => {
                invoices.create({
                    planTripId:dataUserTrips.id,
                    price: dataTrip.price
                })
                .then(dataInvoice => {
                    console.log(`-----------------------------> invoice`);
                    
                    userTrips.update({invoiceId:dataInvoice.id},{
                        where:{
                            id:dataUserTrips.id
                        }
                    })
                    .then(dataupdated =>{
                        console.log(`-----------------------------> print`);
                        res.redirect('user/trip')
                    })
                })    
            })
        })
    }
}

module.exports = ControllerUser