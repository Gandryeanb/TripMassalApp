const Models = require('../models')

class ControllerGuide {
    static home(req , res) {
        res.render('../views/guide/home')
    }
    static add(req , res) {
        res.send('ini guide add')
    }
    
}

module.exports = ControllerGuide