const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const athlete = new Schema(
  {
    code: { type: String },
    name: { type: String },
    startNumber: { type: Number },
  }
);

module.exports = mongoose.model('athletes', athlete);
