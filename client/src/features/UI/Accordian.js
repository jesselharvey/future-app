import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Collapse, Progress, Input, Modal, Popover } from 'antd';
import { CloseCircleOutlined, EditOutlined, ArrowsAltOutlined, DeleteOutlined } from '@ant-design/icons'
import { AccordianContent } from './AccordianContent'
import { useParams } from 'react-router-dom'
import { TaskModal } from '../UI/AppModal'
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

  const tasks = props.tasks
  console.log(tasks)
  let subTasks = tasks.map((task) => {
    return task.tasks
  })
  
  for (let i = 0; i < subTasks.length; i++) {
    subTasks[i].filter(task => {
      return task.status == 'complete'
    })
  //   for (let j = 0; j < subTasks[i].tasks; i++) {
  //     console.log(subTasks[i].tasks[j])
  //   }
  }
  // let completeTasks = subTasks.map().filter((task) => {
  //   return task.status == 'complete'
  // })
  console.log(subTasks)
  // console.log(completeTasks)
  
  function callback(key) {
    // console.log(key)
  }

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
  // let mainTasks = []
  // let subTasks = []

  // useEffect(() => {
    
  // })
  //     for (let i = 0; i < tasks.length; i++) {
  //       mainTasks = tasks[i].tasks
  //       console.log(mainTasks)
        
  //       for (let j = 0; j < tasks[i].tasks.length; j++) {
  //         subTasks = tasks[i].tasks[j]
  //         console.log(subTasks)
  //       }
  //     }

  function handlePercent(task) {
    // console.log(task)

    // for (let i = 0; i < tasks.length; i++) {
    //   console.log(tasks[i].tasks)

    //   for (let j = 0; j < tasks[i].tasks.length; j++) {
    //     let subTasks = tasks[i].tasks[j]
    //     console.log(subTasks)
    //   }
    // }
    
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

  // let subTasks = tasks.map(task => task.tasks.filter(item => {
  //   return task.id == item.parent_id
  // }))
  // console.log(subTasks)
  // let completeTasks = tasks.map(task => task.tasks.filter(item => {
  //   return task.id == item.parent_id && item.status == 'complete'
  // }))
  // console.log(completeTasks)

  const [activeModal, setActiveModal] = useState(null)
  function toggleTaskModal(task) {
    setActiveModal(task)
    console.log(task)
  }
  return (
    <>
    <Collapse onChange={callback}>
    {/* {tasks.map(task => (
      task.parent_id === null ? 
      <Panel header={[task.description, " ", <ArrowsAltOutlined onClick={() => toggleTaskModal(task)} />]}
      extra={
      <Progress type="circle" percent={handlePercent(task)} width={50} />} key={task.id}>
        <AccordianContent goal={props.goal} tasks={tasks} parent_id={task.id}></AccordianContent>
      </Panel>
        : ''
    ))} */}
    {tasks.map(task => (
      <Panel header={task.description}
      extra={
      <Progress type="circle" percent={handlePercent(task)} width={50} />} key={task.id}>
        <AccordianContent goal={props.goal} tasks={task.tasks} parent_id={task.id}></AccordianContent>
      </Panel>
    ))}
    </Collapse>

    {/* {activeModal && (
    <TaskModal 
      disableModal={() => setActiveModal(null)}
      task={activeModal}
      ></TaskModal>
    )} */}

    {/* {singleTask == undefined ? '' :
    <Modal
    title={[
      <Popover content={<span>Delete task.</span>} >
        <DeleteOutlined onClick={() => handleTaskDelete(singleTask.id)}/>
      </Popover>,
      singleTask.description]}
    visible={taskModalState}
    onCancel={() => setTaskModalState(false)}>
      {tasks.map(task => (
        task.parent_id == singleTask.id ?
        <div>
          <Popover content={<span>Delete task.</span>} >
            <DeleteOutlined onClick={() => handleSubTaskDelete(task.id)}/>
          </Popover>
            <span>{task.description}</span>
        </div> :
        ''
      ))}
    </Modal>} */}
    </>
  )
}