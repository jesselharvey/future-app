import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox, Input, Button } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { 
  fetchTasks,
  addSubTask,
  deleteTask,
  editTaskStatus
} from '../../features/components/goals/goalSlice'


export function AccordianContent(props) {
    const { goalId } = useParams()
  const dispatch = useDispatch()
  const [taskText, setTaskText] = useState('')
  const tasks = props.tasks
  console.log(tasks)
  // const [deleteState, setDeleteState] = useState(false)
  // console.log(props.parent_id)
  // console.log(tasks)

  const goalOptions = tasks.map(task => (
    { label: task.description, value: task.description, id: task.id, parent_id: task.parent_id}
  ))

  // console.log(goalOptions)
  
  function onChange(checkedValues) {
    // console.log('checked = ', checkedValues.length);
    // let filteredArr = goalOptions.filter(task => (
    //   task.parent_id == props.parent_id && task.parent_id !== null 
    //   // ?
    //   // task 
    //   // : ''
    // ))
    // // console.log(filteredArr.length)
    // let unchecked = filteredArr.length
    // console.log(unchecked)
    // props.handlePercent(unchecked, checkedValues.length)
    // // props.onChange(checkedValues)
    // // console.log('unchecked = ', uncheckedValues);
  }
  let unchecked = tasks.filter(task => {
    return task.status === 'active' ? task : ''
  })
  console.log(unchecked)



  function handleTaskAdd(e) {
    e.preventDefault()
    dispatch(addSubTask(props.parent_id, props.goal.id, taskText))
    setTaskText('')
    dispatch(fetchTasks(props.goal.id))
  }

  function handleTaskDelete(id) {
    dispatch(deleteTask(goalId, id))
  }

  
  return (
    <div>
      {
        tasks.map(task => (
        <Checkbox checked={task.status === 'complete' ? true : false}>{task.description}</Checkbox>
        ))
      // goalOptions.map(task => (
      //   task.parent_id == props.parent_id ?
        // <Checkbox.Group className="checkboxGroup" onChange={onChange} options={goalOptions.filter(task => (
        //     task.parent_id == props.parent_id && task.parent_id !== null ?
        //     // <CloseCircleOutlined onClick={() => handleTaskDelete(task.id)} />
        //     <span >{task.id}</span>
        //     : ''
        //   ))}
        //   checked={true

        //   //   tasks.filter(task => {
        //   //   return task.status !== 'active' ? task : ''
        //   // })
        //   } />
          // <span key={task.id}>{task.name}</span> 
          //   : ''
          // ))
        }
        <form onSubmit={(e) => handleTaskAdd(e)}>
          <Input style={{width: "25%"}} value={taskText} onChange={(e) => setTaskText(e.target.value)}></Input>
          <button type="submit">Add new sub task</button>
        </form>
    </div>
  )
}