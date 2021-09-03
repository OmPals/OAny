const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const roles = require('../helpers/roles')

const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({phone: req.body.phone}).select('+password')
        if(user) {
            const checkPassword = bcrypt.compareSync(req.body.password, user.password)
            if(checkPassword) {
                const token = jwt.sign(
                    { id: user._id, role: user.role, phone: user.phone, iss: 'oany' }, process.env.PRIVATE)
                delete user.password
                return res.status(200).json({token})
            } else {
                return res.status(401).json({message: 'Credential Mismatched'})
            }
        } else {
            return res.status(401).json({message: 'Invalid Credentials'})
        }
    } catch (error) {
        next(error)
    }
}

const Register = async (req, res, next) => {
    const user = await User.findOne({phone: req.body.phone})
    if(user != null) {
        return res.status(400).json({ message: 'account already created with this phone' })
    } 

    if(!roles.includes(req.body.role)) {
        return res.status(400).json({ message: 'invalid role' })
    }

    try {
        const hash = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hash
        const user = await User.create(req.body)
        return res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

module.exports = { Login, Register }