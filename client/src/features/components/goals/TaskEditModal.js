import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Button, Modal, Form } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { 
  editTaskDescription,
  deleteTask,
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
  return (
    <div style={{display: 'flex'}}>
      <input className="ant-input" defaultValue={description} style={{marginBottom: '1rem', width: width}} />
      <div style={{display: 'flex'}}>
        <Actions onEdit={() => console.log('e', id)} onDelete={() => dispatch(deleteTask(goalId, id))}/>
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