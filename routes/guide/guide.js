const routes = require('express').Router()
const ControllerGuide = require('../../controller/controllerGuide')
const bodyParser = require('body-parser');
const bodyParserUrlencoded = bodyParser.urlencoded({
    extended: false
})

routes.get('/', ControllerGuide.home)
routes.get('/add',bodyParserUrlencoded, ControllerGuide.add)

module.exports = routes