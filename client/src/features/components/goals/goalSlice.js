import { createSlice } from '@reduxjs/toolkit'
import api from '../../../utils/request'


export const goalsSlice = createSlice({
  name: 'goal',
  initialState: {
    user: [],
    goals: [],
  },
  reducers: {
    asyncFetchGoals: (state, action) => {
      state.goals = action.payload
    },
    asyncFetchGoal: (state, action) => {
      state.goal = action.payload
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
    addTaskFunc: (state, action) => {
      state.tasks.push(action.payload)
    },
    removeTaskFunc: (state, action) => {
      state.tasks = state.tasks.filter((task) =>{
        return task.id !== action.payload.id
      })
    },
    addSubTaskFunc: (state, action) => {
      state.tasks.push(action.payload)
    },
    removeSubTaskFunc: (state, action) => {
      state.tasks = state.tasks.filter((task) =>{
        return task.id !== action.payload.id
      })
    }
  },
})

export const { asyncFetchGoals,
  asyncFetchGoal, 
  asyncFetchUser, 
  addGoalFunct, 
  removeGoalFunct, 
  editGoalFunct,
  addTaskFunc,
  removeTaskFunc,
  addSubTaskFunc,
  removeSubTaskFunc,
  } = goalsSlice.actions

export const displayGoals = () => (dispatch) => {
  api.get('/goals').then((resp) => {
    console.log(resp.data)
    dispatch(asyncFetchGoals(resp.data))
  })
}

export const fetchGoal = (id) => (dispatch) => {
  api.get('/goal/' + id).then((resp) => {
    console.log(resp.data)
    dispatch(asyncFetchGoal(resp.data))
  })
}

export const fetchUser = () => (dispatch) => {
  api.get('/users').then((resp) => {
    console.log(resp.data)
    dispatch(asyncFetchUser(resp.data))
  })
}




export const selectUser = state => state.goal.user
export const selectGoals = state => state.goal.goals
export const selectGoal = state => state.goal.goal

export default goalsSlice.reducer