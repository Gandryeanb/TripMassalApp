const routes = require('express').Router()
const ControllerUser = require('../../controller/controllerUser')
const Helper = require('../../controller/controllerHelper')
const bodyParser = require('body-parser');
const bodyParserUrlencoded = bodyParser.urlencoded({
    extended: false
})

routes.get('/', ControllerUser.home)
routes.post('/edit', bodyParserUrlencoded, ControllerUser.editPost)
routes.get('/edit', ControllerUser.edit)
routes.post('/creating',bodyParserUrlencoded, Helper.balanceChecker,ControllerUser.creating)
routes.post('/create', bodyParserUrlencoded, ControllerUser.create)
routes.get('/:id/create', ControllerUser.create)
routes.get('/trip', ControllerUser.trip)
routes.post('/topup', bodyParserUrlencoded, ControllerUser.topUpPost)
routes.get('/topup', ControllerUser.topUp)
routes.post('/join', bodyParserUrlencoded, Helper.balanceChecker,ControllerUser.joinPartyPost)
routes.get('/:id/join', ControllerUser.joinParty)
module.exports = routes