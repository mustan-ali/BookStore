const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const bookRoute = require('./routes/bookRoute')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bookRoute)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`Database Connected & Server Running on ${PORT}`)
        app.listen(PORT)
    })
    .catch((err) => {
        console.log(err)
    })