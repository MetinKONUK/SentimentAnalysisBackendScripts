const mongoose = require('mongoose');
const ManagerMoventSchema = new mongoose.Schema({
    moventName: {
      type: String,
      required: true
    },
    moventLastname: {
      type: String,
      required: true
    },
    moventAge: {
      type: Number,
      required: true
    },
    moventPhoneNumber: {
      type: Number,
      required: true
    },
    letterOfRequest: {
      type: String,
      required: true
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    moventEmailAddress: {
      type: String,
      required: true
    },
    moventPassword: {
      type: String,
      required: true
    }
}, {versionKey: false, collection: 'manager-register-request-collection'});

const ManagerMovent = mongoose.model('manager-register-request-collection', ManagerMoventSchema);
module.exports = ManagerMovent;