import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserInfo, selectGoals, displayGoals, fetchUser } from '../goals/goalSlice'
import { AddGoalButton } from '../../UI/Buttons'
import { DatePicker, Card, Menu, Breadcrumb } from 'antd'
import { SmileOutlined } from '@ant-design/icons';

export function Dashboard() {
  const dispatch = useDispatch()
  const goals = useSelector(selectGoals)
  const user = useSelector(selectUserInfo)

  const SubMenu = Menu.SubMenu;
  const MenuItemGroup = Menu.ItemGroup;

  useEffect(() => {
    dispatch(displayGoals())
    dispatch(fetchUser())
  }, [dispatch])

  console.log(goals)
  console.log(user)

  return (<>
    <div className="header">
      <Breadcrumb id="nav-bar">
      <button className="fake-logo">
        <h1 className="name-logo">AppName</h1>
      </button>
      <Breadcrumb.Item><a href="">Goals</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Settings</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Contact Us</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Future Features</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Logout</a></Breadcrumb.Item>
      </Breadcrumb>
      </div>
      <div className="main">
      <div className="body">
        <div className="dashboard-header">
          <h1 className="welcome-header">Good morning "username"</h1>
          <Link to={'/goal-form'}><AddGoalButton className="add-goal-button" /></Link>
          <p className="motivation-quote">"If the mind is willing, the flesh could go on and on without many things."<br/>– Sun Tzu</p>
        </div>
        <h1 className="lets-make-progress">Lets make progress!</h1>
        <div id="goalGrid">
          {goals.map((goal) => (
            <Card >
              <Link className="goalCard" to={`/api/goal/${goal.id}`}>
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


// create new goal
// pick between current goals
// contact admins
// sign out 
// settings
// future patch notes