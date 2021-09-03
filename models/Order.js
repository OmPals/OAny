const mongoose = require('mongoose')
const order_stages = require('../helpers/order_stages')

const Order = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order_stage: {
        type: String,
        enum: order_stages,
        default: order_stages[0]
    },
    items: {
        type: Array,
        required: true
    },
    pickup_locations: {
        type: Array,
        required: true
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Order', Order)