var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('LogMessage', new Schema({
  user: {type: ObjectId},
  message: String,
  timestamp: Date
}));
