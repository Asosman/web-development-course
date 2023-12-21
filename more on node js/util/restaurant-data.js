const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, "..","data", "restaurants.json");


function readAndStoreRestaurant(){
  const fileData = fs.readFileSync(filePath);
  const storeRestaurant = JSON.parse(fileData);

  return storeRestaurant;
}
function writeAndStore(storable){
    fs.writeFileSync(filePath, JSON.stringify(storable));
}       

module.exports ={
    readAndStoreRestaurant:readAndStoreRestaurant,   
    writeAndStore:writeAndStore
}