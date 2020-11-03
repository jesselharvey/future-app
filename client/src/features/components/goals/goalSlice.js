import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const goalsSlice = createSlice({
  name: 'goal',
  initialState: {
    userInfo: {
      id: 1,
      name: "Jesse",
      email: "ex@example.com"
    },
    goals: [
      {
        id: 1,
        title: "stop smoking",
        reason: "it's unhealthy",
        tasks: []
      },      {
        id: 2,
        title: "practice cello",
        reason: "it's soothing",
        tasks: []
      },      {
        id: 3,
        title: "read more",
        reason: "it expands my mind",
        tasks: []
      },      {
        id: 4,
        title: "exercise",
        reason: "it's healthy",
        tasks: []
      },      {
        id: 5,
        title: "stop drinking",
        reason: "it's unhealthy too",
        tasks: []
      },
    ],
  },
  reducers: {
    asyncFetchGoals: (state, action) => {
      state.goals = action.payload
    },
    addGoalFunct: (state, action) => {
      state.goals.push(action.payload)
    },
    removeGoalFunct: (state, action) => {
      state.goals = state.goals.filter((goal) => {
      return goal.id !== action.payload.id
      })
    },
    editGoalFunct: (state, action) => {
      state.goals = state.goals.filter((goal) => {
      return goal.id !== action.payload.id
      })
    },
  },
})

export const { asyncFetchGoals, addGoalFunct, removeGoalFunct, editGoalFunct} = goalsSlice.actions

// export const fetchGoals = () => {
//   axios.get('/api/goals').then((resp) => {
//     dispatch(asyncFetchGoals(resp.data))
//   })
// }

// export const addGoal = (goal) => {
//   axios.post
// }

export const selectUserInfo = state => state.goal.userInfo
export const selectGoals = state => state.goal.goals

export default goalsSlice.reducer