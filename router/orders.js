const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const authorize = require('../helpers/authorize')
const orderStages = require('../helpers/order_stages')

router.post('/', authorize('customer'), OrderController.createOrder)
router.get('/', authorize('admin'), OrderController.getOrders)
router.put('/:id', authorize(['admin', 'driver']), OrderController.updateOrder)
router.get('/statuses', authorize('driver'), getStatuses)

function getStatuses(req, res, next) {
    return res.send(orderStages)
}

module.exports = router