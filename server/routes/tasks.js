const express = require('express')
const router = express.Router()
const conn = require('../db')

router.get('/tasks', async (req, res) => {
  const tasks = await conn.raw(`SELECT * FROM tasks;`)
  res.json(tasks.rows)
})

router.get('/tasks/goals/:goalId', async (req, res) => {
  const goalId = req.params.goalId
  const selectedTask = await conn.raw(`SELECT * FROM tasks WHERE goal_id = ${goalId}`)
  const tasks = selectedTask.rows
  let order = 0
  const taskMap = {}
  for (let item of tasks) {
    item.tasks = []
    // if (!item.parent_id) {
    //   order++
    // }
    item.order = order ++
    taskMap[item.id] = item
  }
  for (let id in taskMap) {
    const currTask = taskMap[id]
    const parentId = currTask.parent_id
    if (parentId) {
      taskMap[parentId].tasks.push(currTask)
      delete taskMap[id]
    }
  }
  const taskResult = []
  for (let key in taskMap) {
    taskResult.push(taskMap[key])
  }
  res.json(taskResult)
})

router.get('/tasks/:id', async (req, res) => {
  const id = req.params.id
  const selectTask = await conn.select().table('tasks').where({id: id})
  res.json(selectTask)
})

router.post('/tasks/:taskId/goals/:goalId', async (req, res) => {
  const subTask = await conn('tasks').insert({description: req.body.description, parent_id: req.params.taskId, goal_id: req.params.goalId})
  res.json({message: 'sub task created'})
})

router.patch('/tasks/:id/', async (req, res) => {
  const task = await conn('tasks').where({id: req.params.id}).update({description: req.body.description})
  res.json({message: 'task updated'})
})

router.patch('/tasks/:id/:status', async (req, res) => {
  const task = await conn('tasks').where({id: req.params.id}).update({status: req.params.status})
  res.json({message: 'task updated'})
})

router.delete('/tasks/:id', async (req, res) => {
  await conn('tasks').where({id: req.params.id}).del()
  res.json({message: 'task deleted'})
})

module.exports = router

