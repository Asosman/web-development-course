const bcrypt = require('bcryptjs');


const db = require('../data/database');

class User{
    constructor(name,email,passward,street,postalCode,city){
        this.name = name,
        this.email = email,
        this.passward = passward,
        this.address = {
            street:street,
            postalCode:postalCode,
            city:city
        } 
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