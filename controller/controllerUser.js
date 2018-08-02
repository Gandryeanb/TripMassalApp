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
        .then(dataUser => {
            userTrips.findAll({
                include:[models.Invoice,models.Trip,models.User],
                where:{
                    userId:dataUser.id
                }
            })
            .then(dataTripUser => {
                trips.findAll()
                .then(dataTrip => {
                    let dateDepature = []
                    let dateDue = []
                    for (let i= 0; i < dataTripUser.length; i++) {
                        const n = 4; 
                        const today = new Date(String(dataTripUser[i].dueDatePayment)); 
                        const requiredDatePlus = new Date(today.getFullYear(),today.getMonth(),today.getDate()+n)
                        const requiredDateMinus = new Date(today.getFullYear(),today.getMonth(),today.getDate())
                        const StringPlus = String(requiredDatePlus)
                        const StringMinus = String(requiredDateMinus)
                        dateDepature.push(StringPlus.slice(4,15))
                        dateDue.push(StringMinus.slice(4,15))
                    }
                    res.render('../views/user/home', {
                        dataTripUser:dataTripUser,
                        dataTrip:dataTrip,
                        datePlus:dateDepature,
                        dateMnus:dateDue,
                        title:'User Page',
                        header:'User Name',
                        dataUser:dataUser
                    })
                })
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
            order: [['dueDatePayment', 'ASC']],
            include:[models.Invoice,models.Trip,models.User]
        })
        .then(dataTripUser => {
            trips.findAll()
            .then(dataTrip => {
                
                console.log(dataTripUser);
                
                let dateDepature = []
                let dateDue = []
                for (let i= 0; i < dataTripUser.length; i++) {
                    const n = 4; 
                    const today = new Date(String(dataTripUser[i].dueDatePayment)); 
                    const requiredDatePlus = new Date(today.getFullYear(),today.getMonth(),today.getDate()+n)
                    const requiredDateMinus = new Date(today.getFullYear(),today.getMonth(),today.getDate())
                    const StringPlus = String(requiredDatePlus)
                    const StringMinus = String(requiredDateMinus)
                    dateDepature.push(StringPlus.slice(4,15))
                    dateDue.push(StringMinus.slice(4,15))
                }
                res.render('../views/user/trip', {
                    title:'Trip Page',
                    header:'Trip Page',
                    dataTripUser:dataTripUser,
                    dataTrip:dataTrip,
                    datePlus:dateDepature,
                    dateMnus:dateDue,
                    idUser:req.session.user.id
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
            const balanceData = data.dataValues.balance
            const balanceUpdate = req.body.balance 
            const newBalance = Number(balanceData) + Number(balanceUpdate)
            users.update({balance:newBalance},{
                where:{
                    email:req.session.user.email
                }
            })
            .then(data => {
                req.session.user.balance = data.balance
                res.redirect('/user')
            })
        })
    }
    static create(req, res) {
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
                    userTrips.update({
                        invoiceId:dataInvoice.id,
                        statusInvoice:true  
                    },{
                        where:{
                            id:dataUserTrips.id
                        }
                    })
                    .then(dataupdated =>{
                        res.redirect('user/trip')
                    })
                })    
            })
        })
    }
    static joinPartyPost(req,res) {
        userTrips.findOne({
            where:{
                tripId:req.body.id,
                invoiceId:req.body.invoiceId
            },
        })
        .then(dataUserTrip => {
            let newUserTrip = {
                userId:req.session.user.id,
                tripId:dataUserTrip.tripId,
                statusInvoice:true,
                dueDatePayment:dataUserTrip.dueDatePayment
            }
            userTrips.create(newUserTrip)
            .then(dataNewUserTrip => {
                trips.findOne({
                    where:{
                        id:dataNewUserTrip.tripId
                    }
                })
                .then(dataTrip => {
                    invoices.create({
                        planTripId:dataNewUserTrip.id,
                        price:dataTrip.price
                    })
                    .then(dataInvoice => {
                        userTrips.update({
                            invoiceId:dataInvoice.id
                        },{
                            where:{
                                id:dataNewUserTrip.id
                            }
                        })
                        .then(newData => {
                            res.redirect('user/trip')
                        })
                    })
                })
            })
        })
    }
    static joinParty(req,res) {
        userTrips.findOne({
            where:{
                id:req.params.id
            },
            include:[models.Trip,models.Invoice]
        })
        .then(data => {
            let dateDue = String(data.dataValues.dueDatePayment).slice(4,15)
            res.render('../views/user/join',{
                title:'Join party Page',
                header:'Join party Page',
                data:data,
                date:dateDue
            })
        })
    }
}

module.exports = ControllerUser