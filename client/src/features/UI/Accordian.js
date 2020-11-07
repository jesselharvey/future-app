import React, { useState } from 'react';
import { Collapse, Progress } from 'antd';
import { AccordianContent } from './AccordianContent'

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

  const goal = props.goal
  console.log(goal)

  return (
    <Collapse onChange={callback}>
    {goal.tasks.map(task => (
      task.parent_id === null ? 
      <Panel header={task.name} extra={<Progress type="circle" percent={testPercent(incomplete, complete)} width={50} />} key={task.id}>
        <AccordianContent handlePercent={handlePercent} goal={goal} parent_id={task.id}></AccordianContent>
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