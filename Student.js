
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: Number,
    course: String
});

module.exports = mongoose.model('Student', studentSchema);
