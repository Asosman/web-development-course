const deleteBtnElements = document.querySelectorAll('.product-item__actions button');


async function deleteProduct(e){
  const btnElement = e.target;
  const productId = btnElement.dataset.id;
  const csrfToken = btnElement.dataset.csrf;
 
 const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken,{
    method:'DELETE'
  })
  
if(!response.ok){
    alert('something went wrong!!');
    return;
}

btnElement.parentElement.parentElement.parentElement.parentElement.remove()

}

for(const deleteBtnElement of deleteBtnElements){
    deleteBtnElement.addEventListener('click',deleteProduct);
}

