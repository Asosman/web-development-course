const User = require('../model/auth.model');
const authSession = require('../util/authentification');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');


function getSignUp(req, res) {
   let sessionData = sessionFlash.getSessionData(req);

  if(!sessionData){
    sessionData = {
        email:'',
        confirmEmail:'',
        passward:'',
        name:'',
        street:'',
        post:'',
        city:''
    }
  }
    res.render('customer/auth/signup', {inputData: sessionData});
}

async function signup(req, res) {
    const inputData = {
        email:req.body.email, 
        confirmEmail: req.body['confirm-email'],
        passward:req.body.passward,
        name: req.body.fullname, 
        street:req.body.street, 
        post:req.body.postalCode,
        city:req.body.city
    }

    if (!validation.userDetailsAraValid(
        req.body.email, req.body.passward, req.body.fullname, req.body.street, req.body.postalCode, req.body.city
    ) || !validation.emailAreConfirmed(req.body.email, req.body['confirm-email']))
    {
        sessionFlash.FlashDataToSession(req,
            {
                errorMessage:'check your credentials for errors in your name ',
                ...inputData
            },
            function(){
                res.redirect('/signup');
            }
            )
        return;
    }

   const newUser = new User(req.body.email, req.body.passward, req.body.fullname, req.body.street, req.body.postalCode, req.body.city)

    try {
        const existingAlready= await newUser.existAlready();
        if(existingAlready){   
            sessionFlash.FlashDataToSession(req,
                {
                    errorMessage:'There is an existing user ',
                    ...inputData
                },
                function(){
                    res.redirect('/signup')
                })
            return;
        }
        await newUser.signup();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/login')
}

function getLogIn(req, res) {
    let sessionData = sessionFlash.getSessionData(req);
    // console.log(sessionData)
    if(!sessionData){
      sessionData = {
          email:'',
          passward:''
      }
    }
    res.render('customer/auth/login',{inputData: sessionData});
}

async function login(req, res) {
    const user = new User(req.body.email, req.body.passward);
    let existingUser;
    try {
        existingUser = await user.getUserWithThesameEmail();
    } catch (error) {
        next(error);
        return;
    }

    if (!existingUser) {
        sessionFlash.FlashDataToSession(req,
            {
                errorMessage:'could not find a user registar instead',
                email:req.body.email,
                passward: req.body.passward
            },
            function(){
                res.redirect('/login');
            } )
        return;
    }

    const passwardIsEqaul = await user.passwardAreEqaul(existingUser.passward);

    if (!passwardIsEqaul) {
        sessionFlash.FlashDataToSession(req,
            {
                errorMessage:'Your password or email is not correct',
                email:req.body.email,
                passward: req.body.passward
            },
            function(){
                res.redirect('/login');
            } )
        return;
    }
    console.log('you logged in successivefully!!!!');

    authSession.createUserSession(req, existingUser, function () {
        console.log('inside the function')
    
        res.redirect('/');
    })
    // res.redirect('/signup');
}


function logout(req, res) {
    authSession.destroyUserAuthSession(req);
    console.log('logged  out!!!!');
    res.redirect('/login');

}

module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn,
    signup: signup,
    login: login,
    logout: logout
}