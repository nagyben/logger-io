// http://blog.slatepeak.com/creating-a-simple-node-express-api-authentication-system-with-passport-and-jwt/
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var User = require('./models/user');

var NotFoundError = require('./errors/notFoundError');

var jwt = require('jsonwebtoken');
var config = require('./config');

var path = require('path');

var app = express();

var winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  'timestamp': true
});

var port = process.env.PORT || 8810;
mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(morgan('dev'));

app.use(passport.initialize());
require('./passport')(passport);

// error handler
process.on('uncaughtException', function(err) {
  winston.error(err);
  winston.error(JSON.stringify(err, null, 2));
});

// debug user
app.get('/dummy', function(req, res) {
  var user = new User();
  user.email = "herp@derp.com";
  user.password = "derp";
  user.save(function(err) {
    if (err) {
      switch (err.code) {
        case 11000:
          winston.info(err);
          // duplicate entry, fine for our dummy route
          res.status(200)
            .json({
              success: true,
              message: 'Dummy user created successfully'
            });
          break;
        default:
          throw err;
      }
    } else {
      res.status(200)
        .json({
          success: true,
          message: 'Dummy user created successfully'
        });
    }
  });
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

var userRoutes = require('./routes/userRoutes');
var logRoutes = require('./routes/logRoutes');
var apiRoutes = express.Router();
apiRoutes.get('/', function(req, res) {
  res.status(200).json({
    message: 'The logger.io API'
  });
});

app.use('/api', apiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/log', logRoutes);
app.listen(port);

console.log('Server running on http://localhost:' + port);
