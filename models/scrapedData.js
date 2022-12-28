const mongoose = require('mongoose');
const ScrapedDataSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      required: true
    },
}, {versionKey: false, collection: 'scraped-data-collection'});

const ScrapedData = mongoose.model('scraped-data-collection', ScrapedDataSchema);
module.exports = ScrapedData;