const express = require('express')
const router = express.Router()
const conn = require('../db')


router.get('/goals', async (req, res) => {
  const { id } = req.user
  const goals = await conn.select().table('goals').where({user_id: id})
  res.json(goals)
})

router.get('/goals/:id', async (req, res) => {
  const goalId = req.params.id
  const goal = await conn.select().table('goals').where({id: goalId})
  res.json(goal)
})

router.post('/goals/users/:userId', async (req, res) => {
  const goal = await conn('goals').insert({title: req.body.title, reason: req.body.reason, date: req.body.date, time: req.body.time, user_id: req.params.userId})
  res.json({message: 'goal created'})
})


router.delete('/goals/:id', async (req, res) => {
  await conn('goals').where({id: req.params.id}).del()
  res.json({message: 'goal deleted'})
})

router.patch('/goals/:id', async (req, res) => {
  await conn('goals').where({id: req.params.id}).update({title: req.body.title, reason: req.body.reason, date: req.body.date, time: req.body.time, status: req.body.status})
  res.json({message: 'goal updated'})
})



module.exports = router

