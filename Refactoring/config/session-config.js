const mongodbStore = require('connect-mongodb-session');

function CreateSesssionStore(session){
    const MongoDBStore = mongodbStore(session);
    new MongoDBStore({
        uri: 'mongodb://0.0.0.0:27017',
        databaseName: 'auth-demo',
        collection: 'sessions'
      })
}

function createSession( sessionStore){
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  }
}

module.exports ={
 createSession:createSession,
 CreateSesssionStore: CreateSesssionStore   
}