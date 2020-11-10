import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser, selectGoals, displayGoals, fetchUser } from '../goals/goalSlice'
import { AddGoalButton } from '../../UI/Buttons'
import Navbar from '../../UI/Nav'
import { Card, Button, Modal, Steps, message } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { GoalForm } from '../goals/GoalForm'

export function Dashboard() {
  const dispatch = useDispatch()
  const goals = useSelector(selectGoals)
  const user = useSelector(selectUser)
  const [visible, setVisible] = useState(false);
  const { Step } = Steps

  

  useEffect(() => {
    dispatch(displayGoals())
    dispatch(fetchUser())
  }, [dispatch])


  return (<>
    <Navbar />
    <div className="body">
      <div className="main">
        <div className="dashboard-header">
          <h1 className="welcome-header">Good morning, Lance!</h1>
            {/* <Link to={'/goal-form'}><AddGoalButton className="add-goal-button" /></Link> */}
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
          <GoalForm/>
        </Modal>

        <h1 className="lets-make-progress">Lets make progress!</h1>
        <button className="dashboard-view-goal">
          View Goals
        </button>
        <div className="contact-area">
          <SmileOutlined className="contact-icon" />
        </div>
        <div id="goalGrid"> 
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
  </>
  )
}
