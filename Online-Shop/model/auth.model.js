const bcrypt = require('bcryptjs');


const db = require('../data/database');

class User{
    constructor(email,passward,name,street,postalCode,city){
        this.name = name,
        this.email = email,
        this.passward = passward,
        this.address = {
            street:street,
            postalCode:postalCode,
            city:city
        } 
    }
  
    passwardAreEqaul(hashedPassward){
        return bcrypt.compare(this.passward,hashedPassward);
    }


    getUserWithThesameEmail(){
        return db.getDb().collection('user').findOne({email:this.email})
    }


    async signup(){
        const hashedPassward = await bcrypt.hash(this.passward,12);
        const result = await db.getDb().collection('user').insertOne({
            name:this.name,
            email:this.email,
            passward:hashedPassward,
            address:{...this.address}
        })
    }


}


module.exports = User;