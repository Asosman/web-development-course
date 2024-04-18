const path = require('path');

const express = require('express');
const csrf = require('csurf');
const session = require('express-session');

const db = require('./data/database');

const csrfToken = require('./middlewares/csrfTokenMiddleware');
const errorHandler = require('./middlewares/error-handling');
const checkLoginStatusMiddleware = require('./middlewares/check-login')

const sessionConfig = require('./config/sessionConfig')
const authRoutes = require('./routes/auth.route');
const productsRoutes = require('./routes/products.route');
const baseRoutes = require('./routes/base.route');


const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views' ))

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.use(session(sessionConfig()))

app.use(csrf());
app.use(csrfToken);
app.use(checkLoginStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

app.use(errorHandler);  

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