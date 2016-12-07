//https://matoski.com/article/jwt-express-node-mongoose/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var TagSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false,
    required: false
  },
  tags: [TagSchema]
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(12, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
