const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddlewares = require('../middlewares/file-uploads');


const router = express.Router();


router.get('/products', adminController.getProducts);

router.get('/products/new',adminController.getNewProducts);

router.post('/products', imageUploadMiddlewares,adminController.createNewProducts);

router.get('/products/:id',adminController.getUpdateProduct);

router.post('/products/:id',imageUploadMiddlewares, adminController.updateProduct);

router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;