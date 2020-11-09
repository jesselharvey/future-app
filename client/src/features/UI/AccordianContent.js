import React, { useState } from 'react'
import { Checkbox, Input } from 'antd'


export function AccordianContent(props) {
  const tasks = props.tasks
  const [deleteState, setDeleteState] = useState(false)
  // console.log(props.parent_id)
  console.log(tasks)

  const goalOptions = tasks.map(task => (
    { label: task.description, value: task.description, id: task.id, parent_id: task.parent_id}
  ))

  console.log(goalOptions)
  
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues.length);
    let filteredArr = goalOptions.filter(task => (
      task.parent_id == props.parent_id && task.parent_id !== null 
      // ?
      // task 
      // : ''
    ))
    // console.log(filteredArr.length)
    let unchecked = filteredArr.length
    console.log(unchecked)
    props.handlePercent(unchecked, checkedValues.length)
    // props.onChange(checkedValues)
    // console.log('unchecked = ', uncheckedValues);
  }

  return (
    <div>
      {
      // goalOptions.map(task => (
      //   task.parent_id == props.parent_id ?
        <Checkbox.Group className="checkboxGroup" onChange={onChange} options={goalOptions.filter(task => (
            task.parent_id == props.parent_id && task.parent_id !== null ?
            task 
            : ''
          ))} />
        // <span key={task.id}>{task.name}</span> 
      //   : ''
      // ))
      }
    </div>
  )
}