const express = require('express')
const router = express.Router()
const conn = require('../db')
router.get('/goals', async (req, res) => {
  const goals = await conn.raw(`SELECT * FROM goals;`)
  res.json(goals.rows)
})
module.exports = router