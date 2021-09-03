const express = require('express')
const router = express.Router()
const authorize = require('../helpers/authorize')
const User = require('../models/User')

router.get('/', authorize('admin'), getUsersByRole)

async function getUsersByRole (req, res) {
    let role = req.query.role

    let users = await User.find({ role: role })

    return res.send(users)
}

module.exports = router