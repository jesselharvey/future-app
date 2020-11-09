import React, { useState } from 'react';
import { Collapse, Progress, Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons'
import { AccordianContent } from './AccordianContent'
import { 
  addTask,
  deleteTask
} from '../../features/components/goals/goalSlice'

export function Accordian(props) {
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
    function handlePercent(complete, incomplete) {
      setComplete(complete)
      setIncomplete(incomplete)
      // let percent = incomplete / complete * 100
      // console.log(incomplete, complete)
      // console.log(percent)
      // return percent
    }
    let testPercent = (x, y) => {
      let result = x / y * 100
      return Number.isNaN(result) ? 0 : result.toFixed(1)
    }
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

  const tasks = props.tasks
  // console.log(tasks)

  return (
    <Collapse onChange={callback}>
    {tasks.map(task => (
      task.parent_id === null ? 
      <Panel header={task.description} extra={<Progress type="circle" percent={testPercent(incomplete, complete)} width={50} />} key={task.id}>
        <CloseCircleOutlined />
        <AccordianContent handlePercent={handlePercent} tasks={tasks} parent_id={task.id}></AccordianContent>
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
  )
}