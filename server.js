const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const userRoutes = require('./routes/user')



const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', userRoutes)

const port = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}`))
  })
  .catch(err => {
    console.error(err)
  })
