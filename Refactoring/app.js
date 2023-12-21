const path = require('path');

const express = require('express');
const session = require('express-session');

const csrf = require('csurf');

const db = require('./data/database');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

const sessionConfig = require('./config/session-config');
const authMiddleware = require('./middlewares/auth-middleware');
const csrfTokenMiddleWare = require('./middlewares/csrfToken-middleware');


const app = express();

const sessionStore = sessionConfig.CreateSesssionStore(session);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
 
app.use(session(sessionConfig.createSession(sessionStore)));

app.use(csrf());

app.use(csrfTokenMiddleWare.getCSRFtoken);
app.use(authMiddleware.auth);

app.use(authRoutes);
app.use(blogRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
