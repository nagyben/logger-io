//https://matoski.com/article/jwt-express-node-mongoose/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogMessageSchema = new Schema({
  userId : {
		type: Schema.Types.ObjectId,
		required: true
	},
	tag: {
    type: String,
    required: false,
    default: 'info'
	},
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  collection: 'logs'
});

module.exports = mongoose.model('LogMessage', LogMessageSchema);
