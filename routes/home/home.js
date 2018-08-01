const routes = require('express').Router()
const ControllerHome = require('../../controller/controllerHome')
const bodyParser = require('body-parser');
const bodyParserUrlencoded = bodyParser.urlencoded({
    extended: false
})

routes.get('/', ControllerHome.home)
routes.post('/login',bodyParserUrlencoded,ControllerHome.loginPost)
routes.get('/login', ControllerHome.login)
routes.post('/register', bodyParserUrlencoded,ControllerHome.registerPost)
routes.get('/register', ControllerHome.register)

module.exports = routes