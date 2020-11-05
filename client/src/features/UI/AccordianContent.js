import React from 'react'

export function AccordianContent(props) {
  const goal = props.goal
  console.log(props.parent_id)
  console.log(goal)
  

  return (
    <div>
      {goal.tasks.map(task => (
        task.parent_id == props.parent_id ?
        <span key={task.id}>{task.name}</span> 
        : ''
      ))}
    </div>
  )
}