import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser, selectGoals, displayGoals, fetchUser } from '../goals/goalSlice'
import { AddGoalButton } from '../../UI/Buttons'
import { Button } from 'antd'

export function Dashboard() {
  const dispatch = useDispatch()
  const goals = useSelector(selectGoals)
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(displayGoals())
    dispatch(fetchUser())
  }, [dispatch])

  console.log(goals)
  console.log(user)

  return (
    // <Nav>
    <div className="body">
    <Button type="primary">Test Bitch</Button>
      <h1>Welcome {user.name}</h1>
      <div id="goalGrid">
        {goals.map((goal) => (
        <Link className="goalCard" to={`/goal/${goal.id}`}>
          <div>
          <span>{goal.title}</span>
        </div></Link>
        ))}
        <Link to={'/goal-form'}><AddGoalButton /></Link>
      </div>
    </div>
  )
}