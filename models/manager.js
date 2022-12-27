const mongoose = require('mongoose');
const ManagerSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    managerName: {
      type: String,
      required: true
    },
    managerLastname: {
      type: String,
      required: true
    },
    managerAge: {
      type: Number,
      required: true
    },
    managerPhoneNumbers: {
      type: Array,
      required: false
    },
    managerPrimaryPhoneNumber: {
      type: Number,
      required: true
    },
    managerEmailAddresses: {
      type: Array,
      required: false
    },
    managerCredentials: {
      managerPrimaryEmailAddress: {
        type: String,
        required: true
      },
      managerPassword: {
        type: String,
        required: true
      }
    },
    managerEmployees: {
      type: Array,
      required: false
    }
}, {versionKey: false, collection: 'manager-collection'});

const Manager = mongoose.model('manager-collection', ManagerSchema);
module.exports = Manager;