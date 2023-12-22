const path = require('path');

const express = require('express');

const authRoutes = require('./routes/auth.route');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views' ))

app.use(authRoutes)

app.listen(3000,function(){
    console.log('listening to port 3000')
});