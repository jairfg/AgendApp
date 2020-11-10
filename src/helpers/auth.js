const {Router} = require('express')
const router = Router()
const helpers = {};

helpers.isAuthenticated = (req,res , next ) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg' , 'No estas autorizado')
    res.redirect('/')
}

helpers.isNotAuthenticated = (req,res , next ) => {
    if(req.isAuthenticated()) {
        return res.redirect('/notes');
    }
    return next();

}



module.exports = helpers;


