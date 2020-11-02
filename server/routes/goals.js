const express = require('express')
const router = express.Router()
const conn = require('../db')

router.get('/goals', async (req, res) => {
  const goals = await conn.raw(`SELECT * FROM goals;`)
  res.json(goals.rows)
})

router.get('/goals/id', async (req, res) => {
  const goalId = req.params.id
  const selectedGoal = await conn.raw(`SELECT * FROM goals WHERE id = ${goalId};`)
  res.json(selectedGoal.rows)
})

router.post('/goals/users/:userId', async (req, res) => {
  const goal = await conn('goals').insert({title: req.body.title, reason: req.body.reason, finish_line_date: req.body.finish_line_date, finish_line_time: req.body.finish_line_time, user_id: req.params.userId})
  res.json({message: 'goal created'})
})


router.delete('goals/:id', async (req, res) => {
  await conn('goals').where({id: req.params.id}).del()
  res.json({message: 'goal deleted'})
})



module.exports = router

// router.get('/projects/board', async (req, res) => {
//   const projectId = 1
//   const project = await conn.select().table('projects').where('id', projectId)
//   const projectColumns = await conn.select().table('columns').where('project_id', project[0].id)
//   const columns = []
//   for (let column of projectColumns) {
//       const cards = await conn.select().table('cards').where('column_id', column.id)
//       columns.push({id: column.id, title: column.title, cards})
//   }
//   res.json({id: project[0].id, title: project[0].title, columns})
// })