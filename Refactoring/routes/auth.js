const express = require('express');

const authControllers = require('../controllers/auth-controllers'); 

const router = express.Router();


router.get('/signup',authControllers.getSignUp);

router.get('/login', authControllers.getLogin);

router.post('/signup', authControllers.createUser);

router.post('/login', authControllers.loginUser);

router.post('/logout',authControllers.logoutUser );

module.exports = router;
