const Product = require('../model/product.model');

async function getProducts(req ,res, next){
    try{
        const products = await Product.findAll();
        // console.log(products)
        res.render('admin/product/all-products',{products:products})
    }catch(error){
        next(error)
        return;
    }
}

function getNewProducts(req,res){
    const product = {
        title:'',
        summary: '',
        price:'',
        description:''
    }

    res.render('admin/product/new-product',{product:product});
}

async function createNewProducts(req, res, next){
    const productData = {
        ...req.body,
        image:req.file.filename
    }

    const product = new Product(productData);

    try{
        const result = await product.save();
    }catch(error){
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

 async function getUpdateProduct(req, res, next){

   let product;
    try{
         product = await Product.findById(req.params.id);
    }catch(error){
        next(error);
    }

    res.render('admin/product/update-product',{product:product});
}

 async function updateProduct(req, res, next){
    const product = new Product(
        {
            ...req.body,
            _id: req.params.id
        }
    )

    if(req.file){
        product.replaceImage(req.file.filename);
    }
    try{
        const result = await product.save()
    }catch(error){
        next(error);
    }
    res.redirect('/admin/products');
}

async function deleteProduct(req, res,next){
   
    try{  
        const product = await Product.findById(req.params.id);
         await product.removeProduct();
        // await Product.deleteProduct(req.params.id);
    }catch(error){
        next(error);
    }
    res.json({
        message:'item deleted'
    });
}

module.exports = {
    getProducts : getProducts,
    getNewProducts: getNewProducts,
    createNewProducts: createNewProducts,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct,
    deleteProduct: deleteProduct
}