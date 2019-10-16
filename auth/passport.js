const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

var accountModel = require('../models/account')
var bcrypt = require('bcryptjs')


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {
        
    return accountModel.findOne({username})
    .then(user => {
        if (!user) {
            return cb(null, false, {message: 'Incorrect email or password.'});
        }
        bcrypt.compare(password, user.password, function(err, res) {

            if(!err && res===true){      
                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            }else{
                return cb(null, false, {message: 'Incorrect email or password.'});
            }
        });

    })
    .catch(err => {
        return cb(err);
    });
    }
        
    
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'myJjwt'
    },
    function (jwtPayload, cb) {
        return cb(null, {jwtPayload});
    }
));

module.exports  = passport;