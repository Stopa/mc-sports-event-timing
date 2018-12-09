const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const time = new Schema(
  {
    code: { type: String },
    timingPoint: {
      type: String,
      enum: [ 'finishCorridor', 'finishLine' ],
    },
    clockTime: { type: Date },
  }
);

module.exports = mongoose.model('times', time);
