const User = require('../model/auth.model');

function getSignUp(req, res) {
    res.render('customer/auth/signup');
}
function getLogIn(req, res) {
    res.render('customer/auth/login');
}
function login(req, res) {
    req.body;
    console.log(req.body);
    res.redirect('/signup');
}

async function signup(req, res) {
    const newUser = new User(req.body.fullname, req.body.email, req.body.passward, req.body.street, req.body.postalCode, req.body.city)
    await newUser.signup();
    
    res.redirect('/login')
}
module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn,
    signup: signup,
    login: login
}