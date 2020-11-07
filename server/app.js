require('dotenv').config()
const express = require('express')
const app = express();
const PORT = 3001
function attachUser(req, res, next) {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwtToken.decode(token)
    req.user = { id: decoded.id, email: decoded.email }
  }
  next()
}
app.use(attachUser)
const authRoutes = require('./routes/auth')
const usersRoute = require('./routes/users')
const goalsRoute = require('./routes/goals')
const tasksRoute = require('./routes/tasks')
const postsRoute = require('./routes/posts')

const jwtMiddleware = require('express-jwt')
const jwtToken = require('jsonwebtoken')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.get('/api', (req, res) => {
//   res.json({ example: true })
// })
// app.use('/api', authRoutes)
app.get(
  '/api/dashboard',
  jwtMiddleware({ secret: process.env.SECRET, algorithms: ['HS256'] }),
  (req, res) => {
    // req.user will have the user based on the token signed from login
    res.json()
  }
)

app.use('/api', authRoutes)
app.use('/api', usersRoute)
app.use('/api', goalsRoute)
app.use('/api', tasksRoute)
app.use('/api', postsRoute)


app.listen(PORT, () => {
  console.log("listening on port " + PORT)
})