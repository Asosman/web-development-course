const path = require('path');

const express = require('express');
const csrf = require('csurf');
const session = require('express-session');

const db = require('./data/database');
const sessionConfig = require('./config/sessionConfig')

const csrfToken = require('./middlewares/csrfTokenMiddleware');
const errorHandlerMiddlewares = require('./middlewares/error-handling');
const checkLoginStatusMiddleware = require('./middlewares/check-login')
const protectRouteMiddleWare = require('./middlewares/protectRoute')
const initializeCartMiddleware = require('./middlewares/cart')
// const imageUploadMiddlewares = require('./middlewares/file-uploads')

const authRoutes = require('./routes/auth.route');
const productsRoutes = require('./routes/products.route');
const baseRoutes = require('./routes/base.route');
const adminRoutes = require('./routes/admin.route');
const cartRoutes = require('./routes/cart.route');


const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views' ))

app.use(express.static('public'));
app.use('/assets/product/',express.static('product-data'))
app.use(express.urlencoded({extended:false}));
app.use(express.json())


app.use(session(sessionConfig()))
app.use(initializeCartMiddleware);

app.use(csrf());
app.use(csrfToken);
app.use(checkLoginStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use('/cart',cartRoutes);
app.use(productsRoutes);
app.use(protectRouteMiddleWare);
app.use('/admin',adminRoutes);

app.use(errorHandlerMiddlewares);  

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