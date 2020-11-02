const express = require('express')
const router = express.Router()
const conn = require('../db')

router.get('/posts', async (req, res) => {
  const posts = await conn.raw(`SELECT * FROM posts;`)
  res.json(posts.rows)
})

router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id
  const selectedPost = await conn.raw(`SELECT * FROM post WHERE id = ${postId}`)
  res.json(selectedPost.rows)
})

router.post('/posts/goals/:goalId', async (req, res) => {
  const post = await conn('posts').insert({description: req.body.description, goal_id: req.params.goalId})
  res.json({message: 'post created'})
})

router.delete('/posts/:id', async (req, res) => {
  await conn('posts').where({id: req.params.id}).del()
  res.json({message: 'post deleted'})
})

module.exports = router

