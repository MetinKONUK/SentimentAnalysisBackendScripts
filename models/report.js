const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
    reporterEmployeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    reportTitle: {
      type: String,
      required: true
    },
    reportContent: {
      type: String,
      required: true
    },
    reportDate: {
      type: Date,
      default: Date.now,
    },
    reportReferringAnalyze: {
      content: {
        type: String,
        required: true
      },
      analyzeResult: {
        type: String,
        required: true
      }
    }
}, {versionKey: false, collection: 'report-collection'});

const Report = mongoose.model('report-collection', ReportSchema);
module.exports = Report;
