const Product = require('../model/product.model');


async function getProducts(req, res, next){
    try{
        const product = await Product.findAll()
        res.render('customer/product/all-products',{products:product})
    }catch(error){
        next(error)
    }
}


module.exports= {
    getProducts:getProducts
}