const express = require('express');

const authControllers = require('../controllers/auth.controllers');

const router = express.Router();


router.get('/signup', authControllers.getSignUp);

router.get('/login', authControllers.getLogIn);

router.post('/login',authControllers.login);



module.exports = router;