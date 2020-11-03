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
    goals: [],
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

export const displayGoals = (dispatch) => {
  axios.get('/api/goals').then((resp) => {
    console.log(resp.data)
    dispatch(asyncFetchGoals(resp.data))
  })
}


export const selectUserInfo = state => state.goal.userInfo
export const selectGoals = state => state.goal.goals

export default goalsSlice.reducer