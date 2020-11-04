import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const goalsSlice = createSlice({
  name: 'goal',
  initialState: {
    user: {
      id: 1,
      name: 'Jesse',
      email: 'ex@test.com'
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