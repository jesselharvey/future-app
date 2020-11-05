import React from 'react';
import { Collapse } from 'antd';
import { AccordianContent } from './AccordianContent'

export function Accordian(props) {
  const { Panel } = Collapse
  
  function callback(key) {
    console.log(key)
  }

  const goal = props.goal
  console.log(goal)

  return (
    <Collapse onChange={callback}>
    {goal.tasks.map(task => (
      task.parent_id === null ? 
      <Panel header={task.name} key={task.id}>
        <AccordianContent goal={goal} parent_id={task.id}></AccordianContent>
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