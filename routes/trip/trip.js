const routes = require('express').Router()
// const Models = require('../../models')
// const bodyParser = require('body-parser');
// const bodyParserUrlencoded = bodyParser.urlencoded({
//     extended: false
// })

routes.get('/',(req, res) => {
    res.send('page trip')
})

module.exports = routes