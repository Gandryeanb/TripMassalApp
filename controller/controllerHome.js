const crypto = require('crypto')
const models = require('../models')
const users = models.User
const guides = models.Guide

class ControllerHome {
    static home(req, res) {
        res.render('../views/home/home')
    }
    static login(req, res) {
        res.render('../views/home/login')
    }
    static loginPost(req, res) {
        const encripted = crypto.createHash('md5').update(req.body.password).digest('hex')
        if (req.body.selectPicker == 'User') {
            users.findAll({
                    where: {
                        email: req.body.email
                    }
                })
                .then(data => {
                    if (data.length !== 0 && data[0].dataValues.password === encripted) {
                        res.send(data) //redirect ke user page
                    } else {
                        res.send('wrong passwordor email')
                    }
                })
        } else {
            guides.findAll({
                    where: {
                        email: req.body.email
                    }
                })
                .then(data => { 
                    if (data.length !== 0 && data[0].dataValues.password === encripted) {
                        res.send(data) //redirect ke guide page
                    } else {
                        res.send('wrong passwordor email guide')
                    }
                })
        }
    }
    static register(req, res) {
        res.render('../views/home/register')
    }
    static registerPost(req, res) {
        if (req.body.selectPicker == 'User') {
            const encripted = crypto.createHash('md5').update(req.body.password).digest('hex')
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: encripted
            }
            users.create(newUser)
                .then(data => {
                    res.redirect('/login')
                })
        } else {
            const encripted = crypto.createHash('md5').update(req.body.password).digest('hex')
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: encripted
            }
            guides.create(newUser)
                .then(data => {
                    res.redirect('/login')
                })
        }
    }
}

module.exports = ControllerHome