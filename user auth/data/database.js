const {MongoClient} = require('mongodb');

// const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb://0.0.0.0:27017'
  );
  console.log('connecting.............');
  database = client.db('auth-demo');
  console.log(database);
}

function getDb() {
  if (!database) {
    throw { message: 'You must connect first!' };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
