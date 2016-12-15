// http://blog.slatepeak.com/creating-a-simple-node-express-api-authentication-system-with-passport-and-jwt/

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./models/user');
var config = require('./config');
var ObjectId = require('mongoose').Types.ObjectId;

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		console.log("Decoded JWT payload:");
		console.log(jwt_payload);
    if (jwt_payload.id) {
      User.findOne({
        _id: new ObjectId(jwt_payload.id)
      }, function(err, user) {
        if (err) {
					console.log("User not decoded from JWT");
					console.log(err);
          return done(err, false);
        }
        if (user) {
					console.log("User decoded from JWT");
					console.log(user);
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } else {
      done(null, false);
    }
  }));
};
