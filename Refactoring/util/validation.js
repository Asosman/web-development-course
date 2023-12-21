function postIsValid(title,content){
return( title &&
       content &&
       title.trim() !== '' &&
       content.trim() !== ''
   )
}

function userIsValid(Email,ConfirmEmail,Password){
    return(
    Email ||
    ConfirmEmail ||
    Password ||
    Password.trim().length > 6 ||
    Email === ConfirmEmail ||
    Email.includes('@')
    )
}


module.exports = {
    postIsValid:postIsValid,
    userIsValid:userIsValid
}


