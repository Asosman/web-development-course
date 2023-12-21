let onlineCourse = 'web development - Complete Guide';
let onlinePrice = 'N500';
let onlineGoals = ['learning to code', 'Being a developer', 'coding everyday'];

//alert(onlineCourse);
//alert(onlinePrice);
//alert(onlineGoals);

let courseProperty = {
       onlineCourse :'web development - Complete Guide',
       onlinePrice : 'N500',
       onlineGoals : ['learning to code', 'Being a developer', 'coding everyday']        
}
//alert( courseProperty.onlineGoals[1]);

function getListItem(array, arrayIndex) {
    let arrayElement = array[arrayIndex];
    return(alert(arrayElement));    
}
getListItem(courseProperty.onlineGoals, 2);