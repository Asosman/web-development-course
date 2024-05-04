const Product = require('../model/product.model')
async function addToCart(req, res, next){
    let product;
    try{
      console.log(req.body.productId);
      product = await Product.findById(req.body.productId);
    }catch(error){
        next(error);
    }
    const cart = res.locals.cart;
  
    cart.addItem(product);

    req.session.cart = cart; 
    res.status(201).json({
       totalQuantity: cart.totalQuantity,
       totalPrice: cart.totalPrice  
    })
}

module.exports = {
  addToCart: addToCart
} 