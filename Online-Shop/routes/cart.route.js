const express = require('express');
const router = express.Router();

const cartControllers = require('../controllers/cart.controllers')

router.post('/items',cartControllers.addToCart);


module.exports = router;