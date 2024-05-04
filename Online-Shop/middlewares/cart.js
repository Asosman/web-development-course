const Cart = require('../model/cart.model');

function initializeCart(req, res, next) {
    let cart;

    if (!req.session.cart) {
        cart = new Cart();
    } else {
        const cartItem = req.session.cart;
        cart = new Cart(cartItem.items, cartItem.totalPrice, cartItem.totalQuantity);
    }

    req.session.cart = cart;
    res.locals.cart = req.session.cart;
    next()
}

module.exports = initializeCart;