const session= require('express-session');
const mongodbStore = require('connect-mongodb-session');

function createSessionStore(){
    const mongoDbStore = mongodbStore(session)
    const store = mongoDbStore({
        URI: 'mongodb://localhost:27017',
        databaseName:'Online-Shop',
        collection:'session'
    })
    return store;
}

function createSession(){
    return{
        secret :'mine-secret',
        resave:false,
        saveUninitialized:false,
        store: createSessionStore(),
        cookie:{
            maxAge:2 * 24 *60 *60 * 1000
        }
    }
}

module.exports = createSession