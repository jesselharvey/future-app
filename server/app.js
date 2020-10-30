const express = require('express')
const app = express();
const PORT = 3001

require('dotenv').config()

const authRoutes = require('./routes/auth')
const jwtMiddleware = require('express-jwt')
const jwtToken = require('jsonwebtoken')
const usersRoute = require('./routes/users')

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api', usersRoute)
app.use('/api', authRoutes)

function attachUser(req, res, next) {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwtToken.decode(token)
    req.user = { id: decoded.id, username: decoded.username }
  }
  next()
}
app.use(attachUser)
app.get('/api', (req, res) => {
  res.json({ example: true })
})
app.use('/api', authRoutes)
app.get(
  '/api/dashboard',
  jwtMiddleware({ secret: process.env.SECRET, algorithms: ['HS256'] }),
  (req, res) => {
    // req.user will have the user based on the token signed from login
    res.json()
  }
)

app.listen(PORT, () => {
  console.log("listening on port " + PORT)
})