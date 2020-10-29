require('dotenv').config()
const express = require('express')
const app = express();
const PORT = 3001
const usersRoute = require('./routes/users')
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/api', usersRoute)
app.listen(PORT, () => {
  console.log("listening on port" + PORT)
})