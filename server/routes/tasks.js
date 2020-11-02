const express = require('express')
const router = express.Router()
const conn = require('../db')

router.get('/tasks', async (req, res) => {
  const tasks = await conn.raw(`SELECT * FROM tasks;`)
  res.json(tasks.rows)
})

router.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const selectedTask = await conn.raw(`SELECT * FROM tasks WHERE id = ${taskId}`)
  res.json(selectedTask.rows)
})

router.post('/tasks/goals/:goalId', async (req, res) => {
  const task = await conn('tasks').insert({description: req.body.description, goal_id: req.params.goalId})
  res.json({message: 'task created'})
})

router.post('/tasks/:taskId/goals/:goalId', async (req, res) => {
  const subTask = await conn('tasks').insert({description: req.body.description, parent_id: req.params.taskId, goal_id: req.params.goalId})
  res.json({message: 'sub task created'})
})

router.delete('/tasks/:id', async (req, res) => {
  await conn('tasks').where({id: req.params.id}).del()
  res.json({message: 'task deleted'})
})

module.exports = router

