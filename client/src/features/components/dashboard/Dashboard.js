import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser, selectGoals, displayGoals, fetchUser } from '../goals/goalSlice'
import Navbar from '../../UI/Nav'
import { Card, Button, Modal, Steps, message } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { GoalForm } from '../goals/GoalForm'

export function Dashboard() {
  const dispatch = useDispatch()
  const goals = useSelector(selectGoals)
  const user = useSelector(selectUser)
  const [visible, setVisible] = useState(false);

  const success = () => {
    message.success({
      content: 'Nice! A new goal has been created.',
      className: 'new-goal-alert',
      style: {
        marginBottom: '5vh',
      },
    });
  };
  

  useEffect(() => {
    dispatch(displayGoals())
    dispatch(fetchUser(user))
  }, [dispatch])

  function handleClose () {
    setVisible(false)
    dispatch(displayGoals())
    success()
  }

  return (<div className="fade-in">
    <Navbar />
    <div className="body">
      <div className="main">
        <div className="dashboard-header">
          {user.map((item) => {
            return (<h1 className="welcome-header">Good morning, {item.name.length >= 8 ? (<br/>) : ''}{item.name}</h1>)
             })}
            <p className="motivation-quote">“If you fulfill your obligations everyday, you don't need to worry about the future.”<br/> ― Jordan Peterson</p>
        </div>
        <button className="dashboard-start-goal" onClick={() => setVisible(true)}>
          Add Goal
        </button>
        <Modal
          title="Lets get started!"
          centered
          visible={visible}
          footer={null}
          on={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}>
          <GoalForm close={() => handleClose()} />
        </Modal>
        <div className="contact-area">
          <SmileOutlined className="contact-icon" />
        </div>
        <div id={goals.length == 0 ? "goalGridBlank" : "goalGrid"}> 
          {goals.length == 0 ? (<h1 className="no-goals-set">You currently dont have any goals set...</h1>) : ''}
          {goals.map((goal) => (
            <Link className="goalCard" to={`/goal/${goal.id}`}>
              <Card>
                <div className="a-tag-spread">
                  <span>{goal.title}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="dashboard-footer"></div>
    </div>
  </div>
  )
}

