const mongoose = require('mongoose');
const DeveloperSchema = new mongoose.Schema({
    developerName: {
      type: String,
      required: true
    },
    developerLastname: {
      type: String,
      required: true
    },
    developerPhoneNumbers: {
      type: Array,
      required: false
    },
    developerPrimaryPhoneNumber: {
      type: Number,
      required: true
    },
    developerEmailAddresses: {
      type: Array,
      required: false
    },
    developerCredentials: {
      developerPrimaryEmailAddress: {
        type: String,
        required: true
      },
      developerPassword: {
        type: String,
        required: true
      }
    },
}, {versionKey: false, collection: 'developer-collection'});

const Developer = mongoose.model('developer-collection', DeveloperSchema);
module.exports = Developer;