import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Button, Modal, Form } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { 
  editTaskDescription,
  deleteTask,
  fetchTasks
} from './goalSlice'

function Actions(props) {
  return (
    <div>
      <Button onClick={props.onEdit}><EditOutlined /></Button>
      <Button onClick={props.onDelete}><DeleteOutlined /></Button>
    </div>
  ) 
}

function TaskInputItem({id, goalId, description, width}) {
  const dispatch = useDispatch()
  const [descriptionState, setDescription] = useState('')
  useEffect(() => {
    setDescription(description)
  }, [])

  function handleEdit() {
    dispatch(editTaskDescription(goalId, id, descriptionState))
    fetchTasks(goalId)
  }
  function handleDelete() {
    dispatch(deleteTask(goalId, id))
    fetchTasks(goalId)
  }
  return (
    <div style={{display: 'flex'}}>
      <input className="ant-input" value={descriptionState} onChange={(e) => setDescription(e.target.value)} style={{marginBottom: '1rem', width: width}} />
      <div style={{display: 'flex'}}>
      <Button onClick={() => handleEdit()}><EditOutlined /></Button>
      <Button onClick={() => handleDelete()}><DeleteOutlined /></Button>
        {/* <Actions onEdit={() => dispatch(editTaskDescription(goalId, id, descriptionState))} onDelete={() => dispatch(deleteTask(goalId, id))  && dispatch(fetchTasks(goalId))}/> */}
      </div>
    </div>
  )
}

export default function TaskEditModal(props) {
  const [tasks, setTasks] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    setTasks(props.tasks)
  }, [props.tasks])
  return (
    <Modal
    title="Edit Tasks"
    visible={true}
    footer={null}
    style={{overflow: 'auto'}}
    onCancel={props.onClose}
    >
      {tasks.length ?
      <form>
      {tasks.map(task => {
          return (
            <div key={task.id}>
              <h2>Tasks</h2>
              <TaskInputItem id={task.id} description={task.description} goalId={props.goalId}  width={'80%'} />
              {task.tasks.length > 0 && <h3 style={{marginLeft: '1rem', marginBottom: '1rem', marginTop: '1rem'}}>Sub Tasks</h3>}
              {task.tasks.map(subTask => {
                return <div style={{marginLeft: '1rem'}}>
                  <TaskInputItem id={subTask.id} description={subTask.description} goalId={props.goalId}  width={'79%'} />
                </div>
              })}
          </div>)
      })}
      </form>
      : <h2>You have no tasks</h2>  
      }
    </Modal>
      
  )
}