const express = require('express');
const productControllers = require('../controllers/products.controllers')

const router = express.Router();


router.get('/products',productControllers.getProducts)



module.exports = router;