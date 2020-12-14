const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3000;
const app = express()

app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
  res.send("Welcome to Shopping Manager App!")
})

app.listen(PORT, () => {
  console.log(`Server listening on http//:localhost:${PORT}`)
})