class Cart{
    constructor(item = [], totalPrice = 0, totalQuantity = 0 ){
        this.items = item;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }


    addItem(product){
        const cartItem ={
            product:product,
            quantity:1,
            totalPrice: product.price
        }
        for(let i = 0; i < this.items.length; i++){
            const item = this.items[i];
            if(item.product.id === product.id){
                console.log(product);
                cartItem.quantity = cartItem.quantity + 1;
                cartItem.totalPrice = cartItem.totalPrice + product.price;
                this.items[i] = cartItem;
                // console.log(product.price);
                this.totalPrice += product.price;
                this.totalQuantity++
                
                console.log(this.totalPrice, this.totalQuantity);
                return;
            }
        }

        this.items.push(cartItem);
        this.totalPrice += product.price;
        this.totalQuantity++
        console.log(this.totalPrice, this.totalQuantity);
    }
}

module.exports = Cart;