const Item = require('../models/Item')
const Order = require('../models/Order')
const order_stages = require('../helpers/order_stages')
const _ = require('lodash')

async function createOrder(req, res, next) {
    let items = req.body.items
    let itemsToMap = items.map(x => x.id)
    
    try {
        let itemsArray = await Item.find({ _id: { $in : itemsToMap } }).select('+addresses')
        
        let itemsAddr = []
        let pickup_locations = []

        itemsArray.forEach(x => {
            let array = x.addresses
            let randomElement = array[Math.floor(Math.random() * array.length)];
            x.addresses = undefined
            itemsAddr.push({
                item: x,
                qty: items.filter(y => y.id == x._id)[0].qty
            })

            pickup_locations.push({ point: randomElement, item: x })
        });

        const pickup_locations_grouped = _.mapValues(_.groupBy(pickup_locations, 'point'), x => x.map(y => _.omit(y, 'point')).map(y => y.item))

        let order = {
            customer: req.user.id,
            order_stage: 'CREATED',
            items: itemsAddr,
            pickup_locations: pickup_locations_grouped
        }

        let createdOrder = await Order.create(order)
        console.log(createdOrder);

        return res.status(201).json(createdOrder)
    }
    catch(err) {
        next(err)
    }
}

async function getOrders(req, res, next) {
    const status = req.query.status

    try{
        let orders = status === undefined? await Order.find(): await Order.find({ order_stage: status })
        console.log(orders);
        res.send(orders)
    }
    catch (err) {
        next(err)
    }
}

async function updateOrder(req, res, next) {
    const id = req.params.id

    try { 
        // assign driver by admin or status update by driver
        if(req.user.role === 'admin') {
            const driver = req.body.driver

            await Order.findByIdAndUpdate(id, { driver: driver })
        }
        else if(req.user.role === 'driver') {
            const order_stage = req.body.order_stage
            if(!order_stages.includes(order_stage)) {
                return res.status(400).json({ message: "bad order stage" })
            }
            await Order.findByIdAndUpdate(id, { order_stage: order_stage })        
        }

        res.sendStatus(202)
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    createOrder,
    updateOrder,
    getOrders
}