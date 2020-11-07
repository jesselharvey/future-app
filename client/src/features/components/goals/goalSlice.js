import { createSlice } from '@reduxjs/toolkit'
import api from '../../../utils/request'


export const goalsSlice = createSlice({
  name: 'goal',
  initialState: {
<<<<<<< HEAD
    user: {
      // id: 1,
      // name: 'Jesse',
      // email: 'ex@test.com'
    },
    goals: [
      // {
      //   id: 1,
      //   title: "stop smoking",
      //   reason: "it's unhealthy",
      //   tasks: []
      // },      {
      //   id: 2,
      //   title: "practice cello",
      //   reason: "it's soothing",
      //   tasks: []
      // },      {
      //   id: 3,
      //   title: "read more",
      //   reason: "it expands my mind",
      //   tasks: []
      // },      {
      //   id: 4,
      //   title: "exercise",
      //   reason: "it's healthy",
      //   tasks: []
      // },      {
      //   id: 5,
      //   title: "stop drinking",
      //   reason: "it's unhealthy too",
      //   tasks: []
      // },
    ],
    goal: {}
=======
    user: [],
    goals: [],
>>>>>>> 4e4bcb23f8659f3065a34ca5552765cb661edeb0
  },
  reducers: {
    asyncFetchGoals: (state, action) => {
      state.goals = action.payload
    },
<<<<<<< HEAD
    asyncFetchGoal: (state, action) => {
      state.goal = action.payload
    },
=======
>>>>>>> 4e4bcb23f8659f3065a34ca5552765cb661edeb0
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