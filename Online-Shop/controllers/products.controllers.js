const Product = require('../model/product.model');


async function getProducts(req, res, next){
    try{
        const product = await Product.findAll()
        res.render('customer/product/all-products',{products:product})
    }catch(error){
        next(error)
    }
}

async function getProductDetails(req,res ,next){
    let product;

    try{
        product = await Product.findById(req.params.id);
    }catch(error){
        n/ext(error);
    }
    // console.log(product)
   res.render('customer/product/product-details',{product:product});
}

module.exports= {
    getProducts:getProducts,
    getProductDetails:getProductDetails
}