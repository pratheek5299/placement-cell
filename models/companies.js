const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    student:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Students'
    },
    result: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Companies = mongoose.model('Companies', companySchema);

module.exports = Companies;