const path = require('path');

const express = require('express');
const csrf = require('csurf');
const session = require('express-session');

const db = require('./data/database');
const authRoutes = require('./routes/auth.route');
const csrfToken = require('./middlewares/csrfTokenMiddleware');
const sessionConfig = require('./config/sessionConfig')

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views' ))

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.use(session(sessionConfig()))

app.use(csrf());
app.use(csrfToken);

app.use(authRoutes)  

db.connectToDatabase().then(
    function(){
        app.listen(3000,function(){
            console.log('listening to port 3000')
        });
    }
).catch(function(error){
    console.log(error);
    console.log('couldn\'t connect to database');
})