const User = require('../model/auth.model');

function getSignUp(req, res) {
    res.render('customer/auth/signup');
}

async function signup(req, res) {
    const newUser = new User(req.body.email, req.body.passward,req.body.fullname,  req.body.street, req.body.postalCode, req.body.city)
    await newUser.signup();
    
    res.redirect('/login')
}

function getLogIn(req, res) {
    res.render('customer/auth/login');
}

async function login(req, res) {
    const user = new User(req.body.email,req.body.passward);
    const existingUser = await user.getUserWithThesameEmail();
 
    if(!existingUser){
        console.log('could not get any user')
        return;
    }

    const passwardIsEqaul = await user.passwardAreEqaul(existingUser.passward);

    if(!passwardIsEqaul){
        console.log('you passwards are not equal')
        return;
    }
     console.log('you logged in successivefully!!!!');
    
    res.redirect('/signup');
 }

module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn,
    signup: signup,
    login: login
}