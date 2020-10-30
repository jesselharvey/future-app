import { createSlice } from '@reduxjs/toolkit'

export const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    userInfo: {},
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
        goal.id !== action.payload.id
      })
    },
    editGoalFunct: (state, action) => {
      state.goals = state.goals.filter((goal) => {
      goal.id !== action.payload.id
      })
    },
  },
})

export const { asyncFetchGoals, addGoalFunct, removeGoalFunct, editGoalFunct} = 