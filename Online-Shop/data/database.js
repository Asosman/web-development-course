const {MongoClient} = require('mongodb');

let database;

async function connectToDatabase(){
   const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('online-shop');
}


function getDb(){
    if(!database){
        throw new Error('you must connect to database first!!!');
    }else{
        return database;
    }
}

module.exports ={
    connectToDatabase :connectToDatabase,
    getDb:getDb
}