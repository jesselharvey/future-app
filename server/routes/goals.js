const express = require('express')
const router = express.Router()
const conn = require('../db')


router.get('/goals', async (req, res) => {
  const { id } = req.user.id
  const goals = await conn.select().table('goals').where({user_id: id})
  res.json(goals.rows)
})

router.get('/goals/:goalId', async (req, res) => {
  const goalId = req.params.goalId
  // const goal = await conn.select().table('goals').where({id: goalId})
  const goal = await conn.raw(`SELECT * FROM goals WHERE id = ${goalId}`)
  res.json(goal.rows[0])
})

router.post('/goals/users/:userId', async (req, res) => {
  const { id } = req.user.id
  const goal = await conn('goals').insert({title: req.body.title, reason: req.body.reason, date: req.body.date, time: req.body.time})
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

