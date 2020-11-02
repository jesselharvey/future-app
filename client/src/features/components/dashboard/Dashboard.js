import React from 'react'
import { useSelector, 
//useDispatch
} from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserInfo, selectGoals } from '../goals/goalSlice'
import { AddGoalButton } from '../../UI/Buttons'

export function Dashboard() {
  // const dispatch = useDispatch()

  const goals = useSelector(selectGoals)
  const user = useSelector(selectUserInfo)

  console.log(goals)
  console.log(user)

  return (
    // <Nav>
    <div className="body">
      <h1>Welcome {user.name}</h1>
      <div id="goalGrid">
        {goals.map((goal) => (
        <Link className="goalCard" to={`/api/goal/${goal.id}`}><div>
          <span>{goal.title}</span>
        </div></Link>
        ))}
        <Link to={'/goal-form'}><AddGoalButton /></Link>
      </div>
    </div>
  )
}