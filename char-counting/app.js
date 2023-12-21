let charInput = document.querySelector('input');
let remainingChar = document.getElementById('remaining-chars');
console.log(remainingChar);
function updateCharCount(){
    let charAllowed = charInput.maxLength;
    let enteredChar = charInput.value.length;
    //let enteredCharLength = enteredChar.length;
    let charUpdate = charAllowed - enteredCharLength;
    remainingChar.innerHTML = charUpdate; 
    if(remainingChar.textContent <= 10){
         remainingChar.classList.add('warning');
         charInput.classList.add('warning');
    }else{
        remainingChar.classList.remove('warning');
         charInput.classList.remove('warning');
    }
}
charInput.addEventListener('input', updateCharCount);
