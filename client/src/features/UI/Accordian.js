import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Collapse, Progress, Input, Modal } from 'antd';
import { CloseCircleOutlined, EditOutlined, ArrowsAltOutlined } from '@ant-design/icons'
import { AccordianContent } from './AccordianContent'
import { useParams } from 'react-router-dom'
import { 
  addTask,
  deleteTask,
  fetchTask,
  selectTask,
} from '../../features/components/goals/goalSlice'

export function Accordian(props) {
  const { goalId } = useParams()
  const dispatch = useDispatch()
  const { Panel } = Collapse
  
  function callback(key) {
    // console.log(key)
  }

  const arrComplete = [1, 2, 3]
  const arrIncomplete = [4]

  const [complete, setComplete] = useState('')
  const [incomplete, setIncomplete] = useState('')
  // let complete = null
  // let incomplete = null
  

  // function getPercent(incomplete, complete) {
    // function handlePercent(complete, incomplete) {
    //   setComplete(complete)
    //   setIncomplete(incomplete)
      // let percent = incomplete / complete * 100
      // console.log(incomplete, complete)
      // console.log(percent)
      // return percent
    // }

  // }

  // function onChange(checkedValues) {
  //   console.log(checkedValues.length)
  //   let filteredArr = goal.tasks.filter(task => (
  //     task.parent_id !== task.id && task.parent_id !== null ?
  //     task 
  //     : ''
  //   ))
  //   console.log(filteredArr)
  // }

  function handleTaskDelete(id) {
    dispatch(deleteTask(goalId, id))
    setTaskModalState(false)
  }

  function handleSubTaskDelete(id) {
    dispatch(deleteTask(goalId, id))
  }

  const incomingTask = useSelector(selectTask)
  const singleTask = incomingTask[0]
  const [taskModalState, setTaskModalState] = useState(false)
  function toggleTaskModal(id) {
    dispatch(fetchTask(id))
    setTaskModalState(!taskModalState)
    console.log(singleTask)
  }

  // x = checked, y = total subTasks
  let testPercent = (x, y) => {
    let result = x / y * 100
    return Number.isNaN(result) ? 0 : result.toFixed(1)
  }
  // console.log(testPercent(6, 7))

  function handlePercent(task) {
    // console.log(task)
    // let subTasks = tasks.filter(item => {
    //   return task.id == item.parent_id
    // })
    // // console.log(subTasks)
    // let completeTasks = tasks.filter(item => {
    //   return task.id == item.parent_id && item.status == 'complete'
    // })
    // // console.log(completeTasks)
    // return testPercent(completeTasks.length, subTasks.length)
  }

  const tasks = props.tasks
  // console.log(tasks)
  // <CloseCircleOutlined onClick={() => handleTaskDelete(task.id)} />]
  return (
    <>
    <Collapse onChange={callback}>
    {tasks.map(task => (
      task.parent_id === null ? 
      <Panel header={[task.description, " ", <ArrowsAltOutlined onClick={() => toggleTaskModal(task.id)} />]}
       extra={<Progress type="circle" percent={handlePercent(task)} width={50} />} key={task.id}>
        
        <AccordianContent goal={props.goal} tasks={tasks} parent_id={task.id}></AccordianContent>
        {
        // tasks.map(task => (
          // task.parent_id === task.id ?
          // <span>{task.title}</span> 
          // : ''
        // ))
        }
      </Panel>
        : ''
      // <span>{task.name}</span>
    ))}
    </Collapse>
    {singleTask == undefined ? '' :
    <Modal
    title={[<CloseCircleOutlined onClick={() => handleTaskDelete(singleTask.id)}/> ,singleTask.description]}
    visible={taskModalState}
    onCancel={() => setTaskModalState(false)}>
      {tasks.map(task => (
        task.parent_id == singleTask.id ?
        <div>
        <CloseCircleOutlined onClick={() => handleSubTaskDelete(task.id)}/><span>{task.description}</span>
        </div> :
        ''
      ))}
    </Modal>}
    </>
  )
}