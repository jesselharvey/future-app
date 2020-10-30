const express = require('express')
const router = express.Router()
const conn = require('../db')
router.get('/tasks', async (req, res) => {
  const tasks = await conn.raw(`SELECT * FROM tasks;`)
  res.json(tasks.rows)
})
module.exports = router