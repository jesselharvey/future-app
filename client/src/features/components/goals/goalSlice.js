import { createSlice } from '@reduxjs/toolkit'
import api from '../../../utils/request'


export const goalsSlice = createSlice({
  name: 'goal',
  initialState: {
    user: [],
    goal: [],
    goals: [],
    tasks: [],
    posts: [],
  },
  reducers: {
    // GENERAL FETCH REQUESTS
    asyncFetchGoals: (state, action) => {
      state.goals = action.payload
    },
    asyncFetchGoal: (state, action) => {
      state.goal = action.payload
    },
    asyncFetchUser: (state, action) => {
      state.user = action.payload
    },
    asyncFetchTasks: (state, action) => {
      state.tasks = action.payload
    },
    asyncFetchPosts: (state, action) => {
      state.posts = action.payload
    },
    // // GOAL REQUESTS
    // addGoalFunct: (state, action) => {
    //   state.goals.push(action.payload)
    // },
    // removeGoalFunct: (state, action) => {
    //   state.goals = state.goals.filter((goal) => {
    //   return goal.id !== action.payload.id
    //   })
    // },
    // editGoalFunct: (state, action) => {
    //   state.goals = state.goals.filter((goal) => {
    //   return goal.id !== action.payload.id
    //   })
    // },
    // // ENTRY REQUESTS
    // addPostFunc: (state, action) => {
    //   state.posts.push(action.payload)
    // },
    // removePostFunc: (state, action) => {
    //   state.posts = state.posts.filter((post) =>{
    //     return post.id !== action.payload.id
    //   })
    // },
    // // TASK REQUESTS
    // addTaskFunc: (state, action) => {
    //   state.tasks.push(action.payload)
    // },
    // removeTaskFunc: (state, action) => {
    //   state.tasks = state.tasks.filter((task) =>{
    //     return task.id !== action.payload.id
    //   })
    // },
    // addSubTaskFunc: (state, action) => {
    //   state.tasks.push(action.payload)
    // },
    // removeSubTaskFunc: (state, action) => {
    //   state.tasks = state.tasks.filter((task) =>{
    //     return task.id !== action.payload.id
    //   })
    // }
  },
})

export const { 
  asyncFetchGoals,
  asyncFetchGoal, 
  asyncFetchUser, 
  asyncFetchTasks,
  asyncFetchPosts,
  // addPostFunc,
  // removePostFunc,
  // addGoalFunct, 
  // removeGoalFunct, 
  // editGoalFunct,
  // addTaskFunc,
  // removeTaskFunc,
  // addSubTaskFunc,
  // removeSubTaskFunc,
  } = goalsSlice.actions

  export const fetchUser = () => (dispatch) => {
    api.get('/users').then((resp) => {
      console.log(resp.data)
      dispatch(asyncFetchUser(resp.data))
    })
  }

export const displayGoals = () => (dispatch) => {
  api.get('/goals').then((resp) => {
    console.log(resp.data)
    dispatch(asyncFetchGoals(resp.data))
  })
}

export const fetchGoal = (id) => (dispatch) => {
  api.get('/goals/' + id).then((resp) => {
    console.log(resp.data)
    dispatch(asyncFetchGoal(resp.data))
  })
}

export const fetchTasks = (goalId) => (dispatch) => {
  api.get('/tasks/' + goalId).then((resp) => {
    dispatch(asyncFetchTasks(resp.data))
  })
}

export const fetchPosts = (goalId) => (dispatch) => {
  api.get('/posts/goals/' + goalId).then((resp) => {
    dispatch(asyncFetchPosts(resp.data))
  })
}

// ENTRIES

export const addPost = (goalId, text) => (dispatch) => {
  api.post('/posts/goals/' + goalId, {description: text}).then((resp) => {
    // dispatch(asyncFetchPosts())
  })
}

export const deletePost = (id) => (dispatch) => {
  api.delete('/posts/', {id: id}).then((resp) => {
    // dispatch(removePostFunc(resp.body))
  })
}

export const editPost = (id, text) => (dispatch) => {
  api.patch('/posts/' + id, {description: text}).then((resp) => {
    
  })
}

// addTaskFunc, removeTaskFunc, addSubTaskFunc, removeSubTaskFunc
// TASKS

export const addTask = (id, text) => (dispatch) => {
  api.post('/tasks/goals/' + id, {description: text}).then((resp) => {
  })
}

export const addSubTask  = (taskId, goalId, text) => (dispatch) => {
  api.post('/tasks/' + taskId + '/goals/' + goalId, {description: text}).then((resp) => {
  })
}

export const deleteTask = (id) => (dispatch) => {
  api.delete('/tasks/', {id: id}).then((resp) => {
  })
}




export const selectUser = state => state.goal.user
export const selectGoals = state => state.goal.goals
export const selectGoal = state => state.goal.goal
export const selectTasks = state => state.goal.tasks
export const selectPosts = state => state.goal.posts

export default goalsSlice.reducer