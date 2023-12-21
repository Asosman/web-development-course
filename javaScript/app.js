// let colorText = document.getElementById('color').value;
// const changeColor = document.querySelector('button');
// const body = document.querySelector('body');
// function colorChanger(e){
//    //  body.style.backgroundColor = colorText;
//      console.log(e.target.value);
// }
// colorText.addEventListener('input', colorChanger )
function greatUser(useName = 'Guest'){
    console.log(`good evening Mr, ${useName}`);
}
greatUser('Uche');
greatUser();

function sumUp(...numbers){
    let result = 0;
    for(const number of numbers){
        result += number;
    }
    return result;
}
console.log(sumUp(4,2,3,8,0,19,38,34));