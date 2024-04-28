function getProducts(req ,res){
    res.render('admin/product/all-products')
}

function getNewProducts(req,res){
    res.render('admin/product/new-product');
}

function createNewProducts(req, res){
}

module.exports = {
    getProducts : getProducts,
    getNewProducts: getNewProducts,
    createNewProducts: createNewProducts
}