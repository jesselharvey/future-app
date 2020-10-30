require('dotenv').config()
const express = require('express')
const app = express();
const PORT = 3001

const usersRoute = require('./routes/users')
const goalsRoute = require('./routes/goals')
const tasksRoute = require('./routes/tasks')
const postsRoute = require('./routes/posts')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', usersRoute)
app.use('/api', goalsRoute)
app.use('/api', tasksRoute)
app.use('/api', postsRoute)

app.listen(PORT, () => {
  console.log("listening on port" + PORT)
})