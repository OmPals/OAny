const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', getItems)

async function getItems (req, res) {
    let items = await Item.find()

    res.send(items)
}

module.exports = router