const mongoose = require('mongoose')

const User = new mongoose.Schema({
    phone: {
        type: Number,
        length: 10,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('User', User)