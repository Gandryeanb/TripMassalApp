const express = require('express')
const routesGuide = require('./routes/guide/guide')
const routesTrip = require('./routes/trip/trip')
const routesUser = require('./routes/user/user')
const routesHome = require('./routes/home/home')
const app = express()

app.set('view engine', 'ejs');
app.use('/guide',routesGuide);
app.use('/trip', routesTrip);
app.use('/user', routesUser);
app.use('/', routesHome);

app.listen(3000, () => {
    console.log('listening to port 3000');
})