const express = require('express')
const router = express.Router()
const conn = require('../db')

router.get('/goals', async (req, res) => {
  console.log(req.user)
  const userId = req.user.id
  const goals = await conn.raw(`SELECT * FROM goals WHERE user_id = ${userId};`)
  res.json(goals.rows)
})

router.get('/goal/:goalId', async (req, res) => {
  const goalId = req.params.goalId
  console.log(req.params)
  
  // console.log(req.user)
  // const userId = req.user.id
  const goal = await conn.raw(`SELECT * FROM goals WHERE id = ?;`, [goalId])
  // const goal = await conn('goals').where({id: goalId})
  res.json(goal.rows[0])
})

// const goal = await conn.raw(`SELECT * FROM goals WHERE id = ${goalId};`)

// router.get('/goals/:id', async (req, res) => {
//   const goalId = req.params.id
//   const selectedGoal = await conn.raw(`SELECT * FROM goals WHERE id = ${goalId};`)
//   res.json(selectedGoal.rows)
// })

router.post('/goals/users/:userId', async (req, res) => {
  const goal = await conn('goals').insert({title: req.body.title, reason: req.body.reason, date: req.body.date, time: req.body.time, user_id: req.params.userId})
  res.json({message: 'goal created'})
})


router.delete('/goals/:id', async (req, res) => {
  await conn('goals').where({id: req.params.id}).del()
  res.json({message: 'goal deleted'})
})



module.exports = router

