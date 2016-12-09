var express = require('express');
var userRouter = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');
var passport = require('../passport');

userRouter.post('/register', function(req, res) {
	var email = req.body.email || req.email;
	var password = req.body.password || req.password;

	if (!email || !password) {
		res.status(400)
		.json({
			success: false,
			message: "Please enter a username and password"
		});
	} else {
		var newUser = new User({
			email: email,
			password: password
		});

		newUser.save(function(err) {
			if (err) {
				res.status(400)
				.json({success: false, message: 'That email already exists'});
			} else {
				res.status(200)
				.json({success: true, message: 'User created'});
			}
		});
	}
});

userRouter.post('/auth', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	if (!email || !password) {
		res.status(400)
		.json({
			success: false,
			message: "Please enter a username and password"
		});
	} else {
		User.findOne({
			email: email
		}, function(err, user) {
			if (err || !user) {
				res.status(401)
					.json({
						success: false,
						message: 'Authentication failed. Please check your username and password'
					});
			} else {
				user.comparePassword(password, function(err, match) {
					if (err) {
						winston.error(err);
						res.status(401)
							.json({
								success: false,
								message: 'Authentication failed. Please check your username and password'
							});
					} else {
						var token = jwt.sign(user, config.secret, {
							expiresIn: "1d" // 24 hours
						});

						res.status(200)
							.json({
								success: true,
								message: 'Authentication success',
								token: token
							});
					} // if (err)
				}); // User.comparePassword();
			}
		}); // User.findOne()
	}
});

module.exports = userRouter;
