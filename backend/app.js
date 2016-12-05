var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user.js');

var app = express();

var winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  'timestamp': true
});

var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// Basic route
app.get('/', function(req, res) {
  res.send('Welcome to logger.io');
});

// debug user
app.post('/dummy', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  user.save(function(err) {
    if (err) {
      switch (err.code) {
        case 11000:
          // duplicate entry
          res.json({
            success: false,
            message: 'Username already exists'
          });
          break;
        default:
          throw err;
      }
    } else {
      res.json({
        success: true,
        message: 'User created successfully'
      });
    }
  });
});

// API ROUTES ===========================
var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
  res.json({
    message: 'The logger.io API'
  });
});

apiRoutes.post('/auth', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) throw err;

    if (user) {
      // check password
      winston.info('Checking password...');
      encrypt.comparePassword(password, user.encryptedPassword, function(err, match) {
        winston.info(err);
        if (err) {
          res.status(400);
          res.json({
            success: false,
            message: 'Authentication failed. Please check your username and password'
          });
        }

        if (match) {
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: "1d" // 24 hours
          });

          res.json({
            success: true,
            message: 'Authentication success',
            token: token
          });
        }
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: 'Authentication failed. Please check your username and password'
      });
    }
  });
});

// JWT route middleware
apiRoutes.use(function(req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      } // if err
    });
  } else {
    // no token
    return res.status(400).json({
      success: false,
      message: 'No token provided'
    });
  } // if token
});

apiRoutes.post('/log', function(req, res) {

});

app.use('/api', apiRoutes);
app.listen(3000);

console.log('Server running on http://localhost:' + port);
