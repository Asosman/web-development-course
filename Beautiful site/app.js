let variable = 'striaghtlineness';

const arrays = [...variable];
const obj ={ };


// arrays.forEach((item, itemIndex,arrays)=>{
//     console.log(`a[${itemIndex}] = ${item}`);
// })

// console.log(obj)

arrays.forEach((item, itemIndex,arrays)=>{
    if(obj[item]){
        obj[item]++;
    }else{
        obj[item] = 1;
    }
})
console.log(obj);