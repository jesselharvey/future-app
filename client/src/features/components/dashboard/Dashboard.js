import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser, selectGoals, displayGoals, fetchUser } from '../goals/goalSlice'
import { AddGoalButton } from '../../UI/Buttons'
import Navbar from '../../UI/Nav'
import { Card } from 'antd'
import { SmileOutlined } from '@ant-design/icons';

export function Dashboard() {
  const dispatch = useDispatch()
  const goals = useSelector(selectGoals)
  const user = useSelector(selectUser)

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
            <Link to={'/goal-form'}><AddGoalButton className="add-goal-button" /></Link>
             <p className="motivation-quote">“If you fulfill your obligations everyday, you don't need to worry about the future.”<br/> ― Jordan Peterson</p>
        </div>
        <h1 className="lets-make-progress">Lets make progress!</h1>
        <div className="contact-area">
          <SmileOutlined className="contact-icon" />
        </div>
        <div id="goalGrid"> 
          {goals.map((goal) => (
            <Card>
              <Link className="goalCard" to={`/goal/${goal.id}`}>
                <div>
                  <span>{goal.title}</span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <div className="dashboard-footer"></div>
    </div>
  </>
  )
}
