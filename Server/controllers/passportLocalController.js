var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const connection = require("./../configs/DBConnection.js");
const bcrypt = require("bcrypt");


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM users WHERE id = ? ", id, function(err, users){
        done(err, users[0])
    });
});


module.exports.initPassportLocal = passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },

    function(username, password, done) {
        connection.query("SELECT * FROM users WHERE email = ? ", username, function(err, users){
            if(err){return done(err);}
            if(!users[0]){
                return done(null, false, {message: "Incorrect Email."});
            }
            bcrypt.compare(password, users[0].password, function(err, result){
                if(result){
                    return done(null, users[0]);
                }
                return done(null, false, {message: "Incorrect Password."});
            })
            
        });
    }
));