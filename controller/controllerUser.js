const crypto = require('crypto')
const models = require('../models')
const users = models.User

class ControllerHome {
    static home(req, res) {
        res.render('../views/home/home')
    }
    static login(req, res) {
        res.render('../views/home/login')
    }
    static loginPost(req, res) {
        const encripted = crypto.createHash('md5').update(req.body.password).digest('hex')
        users.findAll({
            where: {
                email:req.body.email
            }
        })
        .then(data => {
            if (data[0].dataValues.password === encripted) {
                res.send(data)
            } else {
                res.send('wrong passwordor email')
            }
        })
    }
    static register(req, res) {
        res.render('../views/home/register')
    }
    static registerPost(req, res) {
        const encripted = crypto.createHash('md5').update(req.body.password).digest('hex')
        const newUser = {
            name:req.body.name,
            email:req.body.email,
            password:encripted
        }
        users.create(newUser)
        .then( data => {
            res.redirect('/login')
        })
    }
}

module.exports = ControllerHome