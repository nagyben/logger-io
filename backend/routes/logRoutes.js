// https://blog.jscrambler.com/implementing-jwt-using-passport/
var express = require('express');
var logRouter = express.Router();
var passport = require('passport');
var config = require('../config');
var User = require('../models/user');
var LogMessage = require('../models/logMessage');
var util = require('util');

logRouter.get('/',
  passport.authenticate('jwt', {
    session: false
  }),
  function(req, res) {
    LogMessage.find({
      'userId': req.user.id
    }, function(err, logMessages) {
      res.json(logMessages);
    });
  });

logRouter.post('/',
  passport.authenticate('jwt', {
    session: false
  }),
  function(req, res) {
    var userId = req.user.id;
    var tag = req.body.tag || 'info';
    var message = req.body.message;
    var logMessage = new LogMessage({
      userId: userId,
      tag: tag,
      message: message
    });

    logMessage.save(function(err) {
      if (!err) {
        res.status(200)
          .json({
            success: true,
            logMessage: {
              tag: tag,
              message: message
            }
          });
      } else {
        res.status(400)
          .json({
            success: false,
            message: 'Message not added'
          });
      }
    });
  });

logRouter.delete('/:id',
  passport.authenticate('jwt', {
    session: false
  }),
  function(req, res) {
    if (req.params.id) {
      LogMessage.find({
        _id: req.params.id
      }).remove(function(err) {
        if (!err) {
          res.status(200)
            .json({
              success: true,
              message: 'Message removed'
            });
        } else {
          res.status(400)
            .json({
              success: false,
              message: 'Message not removed'
            });
        }
      });
    } else {
      res.status(400)
        .json({
          success: false,
          message: 'No message id given'
        });
    }
  });

module.exports = logRouter;
