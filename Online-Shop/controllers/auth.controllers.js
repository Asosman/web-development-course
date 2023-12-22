function getSignUp(req, res){
    res.render('customer/auth/signup');
}
function getLogIn(req, res){
    res.render('customer/auth/login');
}

module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn
}