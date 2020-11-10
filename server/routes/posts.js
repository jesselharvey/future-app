const express = require('express')
const router = express.Router()
const conn = require('../db')

router.get('/posts/goals/:goalId', async (req, res) => {
  const goalId = req.params.goalId
  const posts = await conn.raw(`SELECT * FROM posts WHERE goal_id = ${goalId};`)
  res.json(posts.rows)
})

router.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  const selectedPost = await conn.raw(`SELECT * FROM posts WHERE id = ${postId}`)
  res.json(selectedPost.rows)
})

router.post('/posts/goals/:goalId', async (req, res) => {
  const post = await conn('posts').insert({description: req.body.description, goal_id: req.params.goalId})
  res.json(post.rows)
})

router.patch('/posts/:id/', async (req, res) => {
  const id = req.params.id
  const post = await conn('posts').where({id: id}).update({description: req.body.description})
  // res.json({message: 'post updated'})
  res.json(post.rows)
})

router.delete('/posts/:id', async (req, res) => {
  const post = await conn('posts').where({id: req.params.id}).del()
  res.json(post)
})

module.exports = router

