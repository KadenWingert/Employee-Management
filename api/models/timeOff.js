const mongoose = require("mongoose");

const timeOffSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  dateRequested: {
    type: Date,
    required: true,
  },
});

const TimeOff = mongoose.model("TimeOff", timeOffSchema);

module.exports = TimeOff;
