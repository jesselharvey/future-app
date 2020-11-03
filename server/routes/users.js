const express = require('express')
const router = express.Router()
const conn = require('../db')

router.get('/users', async (req, res) => {
  console.log(req.user)
  const id = req.user.id
  const users = await conn.raw(`SELECT * FROM users WHERE id=${id};`)
  res.json(users.rows)
})

module.exports = router



