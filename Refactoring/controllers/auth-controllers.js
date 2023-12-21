const User = require('../model/auth-model')
const validationSession = require('../util/validation-session')
const validation = require('../util/validation');


function getSignUp (req, res) {
    sessionInputData = validationSession.getSessionErrorData(req,
    { 
    email: '',
    confirmEmail: '',
    password: ''
    }
  )
  
    res.render('signup', {
      inputData: sessionInputData
    });
  };

 function getLogin(req, res) {
    const sessionInputData = validationSession.getSessionErrorData(req,{
      email: '',
      password: '',
    })
  
    res.render('login', {
      inputData: sessionInputData
    });
  }
  async function createUser(req, res) {
    const userData = req.body;
    const enteredEmail = userData.email; // userData['email']
    const enteredConfirmEmail = userData['confirm-email'];
    const enteredPassword = userData.password;
  
    if (
      !validation.userIsValid(enteredEmail,enteredConfirmEmail,enteredPassword)
    ) {
      validationSession.flashErrorToSession(req,{
        message: 'Invalid input - please check your data.',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      res.redirect('/signup')
      )
      return;
    }

    const newUser = new User(enteredEmail,enteredPassword);
    const existingUser = await newUser.alreadyExists()
    if (existingUser) {
    validationSession.flashErrorToSession(req,{
        message: 'User exists already!',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      res.redirect('/signup')
      )
      
      return;
    }
  
     const result = await newUser.signup();
    res.redirect('/login');
  }

  async function loginUser (req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;
  
  
    const newUser = new User(enteredEmail,enteredPassword);
    const existingUser = await newUser.getUserWithSameEmail();
  
    if (!existingUser) {
  validationSession.flashErrorToSession(req,{
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      },
        res.redirect('/login')
      );
      return;
    }
  
    const success = await newUser.login(existingUser.password); 
    if (!success) {

      validationSession.flashErrorToSession(req,{
        hasError: true,
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      },
      res.redirect('/login')
      );
      return;
    }
  
    req.session.user = { id: existingUser._id, email: existingUser.email };
    req.session.isAuthenticated = true;
    req.session.save(function () {
      res.redirect('/admin');
    });
  }
  function logoutUser(req, res) {
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/');
  }
  module.exports={
    getSignUp:getSignUp,
    getLogin:getLogin,
    createUser:createUser,
    loginUser:loginUser,
    logoutUser:logoutUser
  }