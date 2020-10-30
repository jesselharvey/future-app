const express = require('express')
const router = express.Router()
const conn = require('../db')
router.get('/posts', async (req, res) => {
  const posts = await conn.raw(`SELECT * FROM posts;`)
  res.json(posts.rows)
})
module.exports = router