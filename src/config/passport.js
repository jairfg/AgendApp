const passport = require('passport')
const LocalStrategy  = require('passport-local').Strategy;
const User = require('../models/User')


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    console.log(user)
    if(!user) {
        return done(null, false, {message : 'No se ha encontrado el usuario'});
    }
    if(!user.comparePassword(password)) {
        return done(null, false, { message : 'Contraseña incorrecta '});
    }
    return done(null, user );
}));



