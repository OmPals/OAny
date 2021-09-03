const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

app.use(express.json())
require('./config/Database')

const Auth = require('./router/auth')
app.use('/', Auth)

const Items = require('./router/items')
app.use('/items', Items)

const Orders = require('./router/orders')
app.use('/orders', Orders) 

// const Shop = require('./router/shop')
// app.use('/shop', Shop)

const User = require("./router/users")
app.use('/users', User)

// global error handler
const errorHandler = require('./helpers/error-handler');
app.use(errorHandler);


const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const mongoose = require('mongoose')
const itemsSeed = require('./helpers/itemsSeed')
mongoose.set('debug', true)

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((data) => {
    console.log(`MongoDB is Connected On ${data.connection.host}`)
    itemsSeed()
        .then(() => {
            console.log('items seeded successfully')
            app.listen(PORT, () => console.log(`Server is started On PORT ${PORT}`))
        })
        .catch((err) => console.log(err.message))
})
