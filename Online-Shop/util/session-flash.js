function getSessionData(req){
    const sessionData = req.session.flashData;

    req.session.flashData = null;

    return sessionData;
}


function FlashDataToSession(req, data, action){
    req.session.flashData = data;
    req.session.save(action)
}

module.exports = {
    FlashDataToSession :FlashDataToSession,
    getSessionData: getSessionData
}