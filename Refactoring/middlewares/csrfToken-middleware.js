function getCSRFtoken(req,res,next){
    res.locals.csrfToken = req.csrfToken();
    next();
}

module.exports ={ getCSRFtoken:getCSRFtoken}