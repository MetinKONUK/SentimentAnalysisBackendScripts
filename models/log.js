const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
    logUrgency: {
      type: Number,
      required: true
    },
    logDate: {
      type: Date,
      default: Date.now,
    },
    logType: {
      type: String,
      required: true
    },
    logContent: {
      type: String,
      required: true
    }
}, {versionKey: false, collection: 'system-log-collection'});

const Log = mongoose.model('system-log-collection', LogSchema);
module.exports = Log;
