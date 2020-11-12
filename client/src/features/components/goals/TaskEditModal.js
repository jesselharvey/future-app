import React, { useEffect, useState } from 'react'
import { Input, Button, Modal, Form } from 'antd';

export default function TaskEditModal(props) {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    console.log(props.tasks)
    setTasks(props.tasks)
  }, [props.tasks])
  return (
    <Modal
    title="Edit Tasks"
    visible={true}
    footer={null}
    >
      <form>
      {tasks.map(task => {
          return <div key={task.id}>
            <h2>Tasks</h2>
            <input className="ant-input" defaultValue={task.description} style={{marginBottom: '1rem'}} />
            {task.tasks.length > 0 && <h2 style={{marginLeft: '1rem'}}>Sub Tasks</h2>}
            {task.tasks.map(subTask => {
              return <div style={{marginLeft: '1rem', marginBottom: '1rem'}}>
                <input className="ant-input" key={subTask.id} defaultValue={subTask.description} />
              </div>
            })}
          </div>
        })}
        <Button htmlType="submit">Submit</Button>
      </form>
      {/* <Form>
        {tasks.map(task => {
          return <Form.Group key={task.id}>
            <Input defaultValue={task.description} />
            {task.tasks.map(subTask => {
              return <Input key={subTask.id} defaultValue={subTask.description} />
            })}
          </Form.Group>
        })}
      </Form> */}
    </Modal>
      
  )
}