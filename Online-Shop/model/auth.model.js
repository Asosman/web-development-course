
const db = require('../data/database');

class User{
    constructor(name,email,passward,street,postalCode,city){
        this.name = name,
        this.email = email,
        this.passward = passward,
        address = {
            street:street,
            postalCode:postalCode,
            city:city
        } 
    }


    async signup(){
        const hashedPassward = a

    }

}








module.exports = User;