const express = require('express')
const routesSession = require('./controller/controllerSession')
const routesGuide = require('./routes/guide/guide')
const routesTrip = require('./routes/trip/trip')
const routesUser = require('./routes/user/user')
const routesHome = require('./routes/home/home')
const session = require('express-session')
const app = express()
const models = require('./models')


app.set('view engine', 'ejs');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))
app.use('/guide', routesSession.Guide,routesGuide);
app.use('/user', routesSession.User, routesUser);
app.use('/trip', routesTrip);
app.use('/',routesHome);

app.get('/logout', (req,res) => {
    req.session.user = null
    res.redirect('/')
})
app.get('/test', (req,res)=> {
    models.UserTrip.findAll({
        include:[models.Invoice]
    })
    .then(data => {
        res.send(data)
    })
})

app.listen(3000, () => {
    console.log('listening to port 3000');
})