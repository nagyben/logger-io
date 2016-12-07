// http://blog.slatepeak.com/creating-a-simple-node-express-api-authentication-system-with-passport-and-jwt/

var JwtStrategy 	= require('passport-jwt').Strategy;
var ExtractJwt 		= require('passport-jwt').ExtractJwt;
var User 					= require('./models/user');
var config 				= require('./config');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		User.findOne({
			id: jwt_payload.id
		}, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
<<<<<<< HEAD
};
=======
};
>>>>>>> 57e9ccaf125aa5ee9080b0a662c76d4c40af1e10
