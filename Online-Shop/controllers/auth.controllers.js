function getSignUp(req, res){
    res.render('customer/auth/signup');
}
function getLogIn(req, res){
    res.render('customer/auth/login');
}
function login(req, res){
 req.body;
 console.log(req.body);
 res.redirect('/signup');
}

function signup(req, res){
    req.body;
    console.log(req.body);
    res.redirect('/login')
}
module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn,
    signup:signup,
    login:login
}