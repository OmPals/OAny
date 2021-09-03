const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const url = process.env.MONGO_URI
