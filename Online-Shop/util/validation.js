function isEmpty(value) {
    return value && value.trim() !== ' ';
}

function userCredentialsAreValid(email, passward,) {
    return email && email.includes('@') && passward && passward.trim() > 5;
}

function userDetailsAraValid(email, passward, name, street, postalCode, city) {
    return userCredentialsAreValid(email, passward) && isEmpty(name) && isEmpty(street) && isEmpty(postalCode) && isEmpty(city);
}

function emailAreConfirmed(email, confirmEmail){
    return email === confirmEmail;
}

module.exports ={
    userDetailsAraValid : userDetailsAraValid,
    emailAreConfirmed :emailAreConfirmed
}