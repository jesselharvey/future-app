import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox, Input } from 'antd'
import { 
  fetchTasks,
  addSubTask,
  deleteTask
} from '../../features/components/goals/goalSlice'


export function AccordianContent(props) {
  const dispatch = useDispatch()
  const [taskText, setTaskText] = useState('')
  const tasks = props.tasks
  // const [deleteState, setDeleteState] = useState(false)
  // console.log(props.parent_id)
  // console.log(tasks)

  const goalOptions = tasks.map(task => (
    { label: task.description, value: task.description, id: task.id, parent_id: task.parent_id}
  ))

  // console.log(goalOptions)
  
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
      function handleTaskAdd(e) {
        e.preventDefault()
        dispatch(addSubTask(props.parent_id, props.goal.id, taskText))
        setTaskText('')
        dispatch(fetchTasks(props.goal.id))
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
        <form onSubmit={(e) => handleTaskAdd(e)}>
          <Input value={taskText} onChange={(e) => setTaskText(e.target.value)}></Input>
        </form>
    </div>
  )
}