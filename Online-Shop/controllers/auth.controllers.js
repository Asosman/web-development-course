function getSignUp(req, res){
    res.send('my conections test')
}
function getLogIn(req, res){
  res.send('conections are ready')
}

module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn
}