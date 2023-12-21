/*let Username = "uchenna";
let uche = ['man u','chelsea','arsnel','liverpool','real maldrid']
let job = {
    jobtitle: 'Developer',
    jobplace: 'Lagos',
    jobsalary: 'N5000000'
}

let classname ={
    manU: 'back sit',
    club: 'chelsea',
    phone: 'cattle',
    address: uche
}

function calculateAdultAge(userAge, narrate){
      let adultAge = userAge - 18;
      return adultAge + " " + narrate;       
}
//setInterval(alert(calculateAdultAge(56,"is his adult year")),5000);
let person = {
    name: 'Uche',
    greet(){
        alert('hello ');
    }
}
let userName = 'Uchechukwu';
console.log(userName.length);
console.log(userName.toUpperCase());
console.log(userName.toLowerCase());
console.log(userName.includes('che'));*/
//console.log(window);
//console.log(window.document);
//console.dir(window);
//console.dir(window.document);
//document.body.children[2].children[0].href="www.waptrick.com";
document.body.children[1].textContent = "my js code in effect";
const paragraph = document.querySelector('p');
const userInput = document.querySelector('input');
const header  = document.querySelector('h1');
const clickButton = document.querySelector('button');
const anchorElement = document.getElementById('link');
anchorElement.href = 'www.manchesterUnited.com';
const newParagraph = document.createElement('p');
newParagraph.setAttribute('id','myId' );
newParagraph.innerHTML = "created <i>with javaScript</i> in my vs code";
///header.appendChild(newParagraph);
paragraph.appendChild(header);

function clickFunction(event){
     const enteredUserInput = userInput.value;
     document.body.style.backgroundColor = enteredUserInput; 

     console.log (enteredUserInput);
}
clickButton.addEventListener('click', clickFunction);



















