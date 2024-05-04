const addToCartbtnElement = document.querySelector('.add-to-cart');

async function addToCart(){
   const csrfToken = addToCartbtnElement.dataset.csrf;
   const productId =  addToCartbtnElement.dataset.id;
  console.log(productId);
  let response;
  try{
      response = await fetch('/cart/items',{
       method:'POST',
       body:JSON.stringify({
           productId:productId,
           _csrf:csrfToken,
       }), 
       headers:{
           'content-type':'application/json'
        }
    })
}catch(error){
    alert('something went wrong!!!');
    throw error;
}

if(!response.ok){
 alert('something went wrong!!!');
 return;
}

const responseData = await response.json();
console.log(responseData);
const newTotalQuantityMobileElement = document.querySelector('#mobile-menu #nav-items .badge');
const newTotalQuantityMainElement = document.querySelector('#main-menu #nav-items .badge');
// console.log(newTotalQuantityElement);
newTotalQuantityMobileElement.innerText = responseData.totalQuantity;
newTotalQuantityMainElement.innerText = responseData.totalQuantity;


}


addToCartbtnElement.addEventListener('click', addToCart);