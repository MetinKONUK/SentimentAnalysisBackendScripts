const mongoose = require('mongoose');
const EmployeeMoventSchema = new mongoose.Schema({
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
    moventEmailAddress: {
      type: String,
      required: true
    },
    moventPassword: {
      type: String,
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
    requestedManagerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

}, {versionKey: false, collection: 'employee-register-request-collection'});

const EmployeeMovent = mongoose.model('employee-register-request-collection', EmployeeMoventSchema);
module.exports = EmployeeMovent;