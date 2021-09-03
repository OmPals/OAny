const mongoose = require('mongoose')

const Item = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    addresses: {
        type: Array,
        select: false
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Item', Item)