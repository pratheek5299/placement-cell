const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    company: {
        type: String,
        requried: true
    },
    date: {
        type: Date,
        requried: true
    },
    result: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;