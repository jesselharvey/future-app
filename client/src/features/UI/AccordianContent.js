import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox, Input, Form, Button, Popover } from 'antd'
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
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
  // console.log(tasks)
  // const [deleteState, setDeleteState] = useState(false)
  // console.log(props.parent_id)
  // console.log(tasks)



  // console.log(goalOptions)
  
  // function onChange(checkedValues) {
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
  // }

  let complete = tasks.filter(task => {
    return task.status === 'complete'
  })
  // console.log(complete)


  function handleTaskAdd() {
    console.log(taskText)
    // e.preventDefault()
    dispatch(addSubTask(props.parent_id, props.goal.id, taskText))
    setTaskText('')
    dispatch(fetchTasks(props.goal.id))
  }

  function handleTaskDelete(id) {
    dispatch(deleteTask(goalId, id))
  }

  function onChange(e, task) {
    // console.log('task ',task.id ,' is checked, ', e.target.checked)
    // console.log(e.target)
    console.log(task)
    if (task.status === 'active') {
      return dispatch(editTaskStatus(task.id, 'complete', goalId))
     } else if (task.status === 'complete') {
      return dispatch(editTaskStatus(task.id, 'active', goalId))
     }
     dispatch(fetchTasks(goalId))
    }
    
    // let subTasks = tasks.filter(item => {
    //   return item.parent_id == props.parent_id
    // })
    // console.log(subTasks)
    
    // let completeTasks = tasks.filter(item => {
    //   return item.parent_id == props.parent_id && item.status == 'complete'
    // })
    // console.log(completeTasks)

    // props.handlePercent(completeTasks, subTasks)

  
  return (
    <div>
      <div className="checkboxGroup">
        {
        tasks.map(task => (
          <Checkbox
        defaultChecked={task.status === 'complete' ? true : false}
        onChange={(e) => onChange(e, task)}>
          {task.description}
        </Checkbox>
        ))
        }
      </div>
        <Form className="taskInput" onFinish={() => handleTaskAdd()}>
          <Input.Group compact style={{display: 'flex'}}>
            <Input placeholder="Enter steps to accomplish your task..." value={taskText} onChange={(e) => setTaskText(e.target.value)} />
            <Button htmlType="submit"><PlusOutlined /></Button>
          </Input.Group>
        </Form>
        {/* <form onSubmit={(e) => handleTaskAdd(e)}>
          <Input value={taskText} onChange={(e) => setTaskText(e.target.value)}></Input>
          <button type="submit">Add new sub task</button>
        </form> */}
    </div>
  )
}