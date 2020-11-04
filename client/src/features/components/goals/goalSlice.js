import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const goalsSlice = createSlice({
  name: 'goal',
  initialState: {
    user: {},
    goals: [],
  },
  reducers: {
    asyncFetchGoals: (state, action) => {
      state.goals = action.payload
    },
    asyncFetchUser: (state, action) => {
      state.user = action.payload
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

export const { asyncFetchGoals, asyncFetchUser, addGoalFunct, removeGoalFunct, editGoalFunct} = goalsSlice.actions

export const displayGoals = () => (dispatch) => {
  axios.get('/api/goals').then((resp) => {
    console.log(resp.data)
    dispatch(asyncFetchGoals(resp.data))
  })
}

export const fetchUser = () => (dispatch) => {
  axios.get('/api/users').then((resp) => {
    console.log(resp.data)
    dispatch(asyncFetchUser(resp.data))
  })
}


export const selectUser = state => state.goal.user
export const selectGoals = state => state.goal.goals

export default goalsSlice.reducer