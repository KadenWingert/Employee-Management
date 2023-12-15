const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;