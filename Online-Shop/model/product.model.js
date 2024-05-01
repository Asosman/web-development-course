const db = require('../data/database');
const { ObjectId } = require('mongodb');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.price = +productData.price;
        this.summary = productData.summary;
        this.description = productData.description;
        this.image = productData.image;
        this.updateImageUrl(this.image);
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findAll() {
        const products = await db.getDb().collection('product').find().toArray();
        return products.map(function (product) {
            return new Product(product);
        })
    }

    static async findById(prodId) {
        let productId;
        try {
            productId = new ObjectId(prodId);
        } catch (error) {
            error.code = 404;
            throw error;
        }
        const product = await db.getDb().collection('product').findOne({ _id: productId });

        if (!product) {
            const error = new Error('Could not find a product with the id')
            error.code = 404;
        }

        return product;
    }
    
    replaceImage(image){
        this.image = image;
        this.updateImageUrl(this.image);
    }

    async save() {
        const productDoc = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        }

        if(!productDoc.image){
            delete productDoc.image;
        }
        let result;
        if (this.id) {
            const prodId = new ObjectId(this.id)
            result = await db.getDb().collection('product').updateOne({ _id: prodId }, {
                projection: {
                    $set: productDoc
                }
            })
        } else {
            result = await db.getDb().collection('product').insertOne(productDoc);
        }
    }




    updateImageUrl(newImage) {
        this.imagePath = `productData/images${newImage}`;
        this.imageUrl = `/assets/product/images/${newImage}`;
    }
}

module.exports = Product;