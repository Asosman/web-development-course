const express = require('express');

const db = require('../data/database');

const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let userInputData = req.session.inputData
  if(!userInputData){
   userInputData = {
     hasError:false,
     email:'',
     confirmEmail:'',
     password:'',
   }
  }

  req.session.inputData = null;

  res.render('signup', {userData:userInputData});
});

router.get('/login', function (req, res) {
  let userInputData = req.session.inputData
  if(!userInputData){
   userInputData = {
     hasError:false,
     email:'',
     password:'',
   }
  }

  req.session.inputData = null;

  res.render('login',{userData:userInputData});
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;
  
  // const userInfo = await db.getDb().collection('users').findOne().toArray();

  if(!enteredEmail|| !enteredConfirmEmail || !enteredPassword ||enteredEmail !== enteredConfirmEmail || enteredPassword.length < 6 || !enteredEmail.includes('@')){
    req.session.inputData = {
      hasError:true,
      message:'Invalid user input !!!',
      email:enteredEmail,
      confirmEmail:enteredConfirmEmail,
      password:enteredPassword
    }
    req.session.save(function(){
      res.redirect('/signup');
    })
    return;
  }
  const existingUser = await db.getDb().collection('users').findOne({email:enteredEmail});

  if(existingUser){
    req.session.inputData = {
      hasError:true,
      message:'User already exist!!!',
      email:enteredEmail,
      confirmEmail:enteredConfirmEmail,
      password:enteredPassword
    }
    req.session.save(function(){
      res.redirect('/signup');
    })
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword,12);
  const user = {
    email:enteredEmail,
    password:hashedPassword
  }
  await db.getDb().collection('users').insertOne(user);
  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db.getDb().collection('users').findOne({email:enteredEmail});
  
  if(!existingUser){
    req.session.inputData = {
      hasError:true,
      message:'Invalid user input !!!',
      email:enteredEmail,
      password:enteredPassword
    }
    req.session.save(function(){
      res.redirect('/login');
    })
    return;
  }
  
  const passwordIsEqual = await bcrypt.compare(enteredPassword,existingUser.password);
  console.log(passwordIsEqual);
  if(!passwordIsEqual){
    req.session.inputData = {
      hasError:true,
      message:'Invalid user input !!!',
      email:enteredEmail,
      password:enteredPassword
    }
    req.session.save(function(){
      res.redirect('/login');
    })
    return;
  }

  req.session.user = {
    id:existingUser._id,
    email:existingUser.email
  }
  req.session.isAuthenticated = true;

  req.session.save(function(){
    console.log('logged in successivefully!!!');
    res.redirect('/profile')
  })
});

router.get('/profile', function (req, res) {
  if(!res.locals.isAuth){
    console.log('your are not authenticated!!!')
    return res.status('401').render('401');
  }
  res.render('profile');
});

router.get('/admin',async function (req, res) {
  if(!res.locals.isAuth){
    console.log('your are not authenticated!!!')
    return res.status('401').render('401');
  }
 
  const user = await db.getDb().collection('users').findOne({_id:req.session.user.id});
  
  // console.log(user);

  if(!res.locals.isAdmin){
    console.log('You are not an admin kindly see out customer care for proper listening!!');
    return res.status('403').render('403');
  }

    res.render('admin');
});

router.post('/logout', function (req, res) {
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/');
});

module.exports = router;
