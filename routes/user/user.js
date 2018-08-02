const routes = require('express').Router()
const ControllerUser = require('../../controller/controllerUser')
// const Models = require('../../models')
const bodyParser = require('body-parser');
const bodyParserUrlencoded = bodyParser.urlencoded({
    extended: false
})

routes.get('/', ControllerUser.home)
routes.post('/edit', bodyParserUrlencoded, ControllerUser.editPost)
routes.get('/edit', ControllerUser.edit)
routes.post('/creating', bodyParserUrlencoded,ControllerUser.creating)
routes.post('/create', bodyParserUrlencoded, ControllerUser.create)
routes.get('/:id/create', ControllerUser.create)
routes.get('/trip', ControllerUser.trip)
routes.post('/topup', bodyParserUrlencoded, ControllerUser.topUpPost)
routes.get('/topup', ControllerUser.topUp)

module.exports = routes