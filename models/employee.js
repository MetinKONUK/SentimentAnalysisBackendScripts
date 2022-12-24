const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    employeeName: {
      type: String,
      required: true
    },
    employeeLastname: {
      type: String,
      required: true
    },
    employeeAge: {
      type: Number,
      required: true
    },
    employeePhoneNumbers: {
      type: Array,
      required: false
    },
    employeePrimaryPhoneNumber: {
      type: Number,
      required: true
    },
    employeeEmailAddresses: {
      type: Array,
      required: false
    },
    employeeCredentials: {
      employeePrimaryEmailAddress: {
        type: String,
        required: true
      },
      employeePassword: {
        type: String,
        required: true
      }
    },
    employeeManagerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    employeeReports: {
      type: Array,
      required: false
    }
}, {versionKey: false, collection: 'employee-collection'});

const Employee = mongoose.model('employee-collection', EmployeeSchema);
module.exports = Employee;