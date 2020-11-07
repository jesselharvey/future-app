const express = require('express')
const router = express.Router()
const conn = require('../db')

router.get('/users', async (req, res) => {
  // console.log(req.user)
  const users = await conn.raw(`SELECT * FROM users;`)
  res.json(users.rows)
})

module.exports = router



