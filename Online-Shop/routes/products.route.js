const express = require('express');
const productControllers = require('../controllers/products.controllers')

const router = express.Router();


router.get('/products',productControllers.getProducts);

router.get('/product/:id', productControllers.getProductDetails)



module.exports = router;