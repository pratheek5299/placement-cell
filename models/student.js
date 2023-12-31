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
    companies:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Companies'
        }
    ],
    dsa: {
        type: String,
        required: true
    },
    webd: {
        type: String,
        required: true
    },
    react: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;