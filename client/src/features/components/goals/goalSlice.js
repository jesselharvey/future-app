import { createSlice } from '@reduxjs/toolkit'
import api from '../../../utils/request'


export const goalsSlice = createSlice({
  name: 'goal',
  initialState: {
    user: [],
    goal: [],
    goals: [],
    tasks: [],
    task: {},
    posts: [],
    post: {}
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
    asyncFetchTask: (state, action) => {
      state.task = action.payload
    },
    asyncFetchPosts: (state, action) => {
      state.posts = action.payload
    },
    asyncFetchPost: (state, action) => {
      state.post = action.payload
    }
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
  asyncFetchTask,
  asyncFetchPosts,
  asyncFetchPost,
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
  api.get('/tasks/goals/' + goalId).then((resp) => {
    dispatch(asyncFetchTasks(resp.data))
  })
}

export const fetchTask = (id) => (dispatch) => {
  api.get('/tasks/' + id).then((resp) => {
    dispatch(asyncFetchTask(resp.data))
  })
}

export const fetchPosts = (goalId) => (dispatch) => {
  api.get('/posts/goals/' + goalId).then((resp) => {
    dispatch(asyncFetchPosts(resp.data))
  })
}

export const fetchPost = (id) => (dispatch) => {
  api.get('/posts/' + id).then((resp) => {
    dispatch(asyncFetchPost(resp.data))
    console.log(resp.data[0])
  })
}

// ENTRIES

export const addPost = (goalId, date_time, text) => (dispatch) => {
  api.post('/posts/goals/' + goalId, {description: text, date_time: date_time}).then((resp) => {
    dispatch(fetchPosts(goalId))
    // console.log(resp.config.data)
    // dispatch(addPostFunc(resp.body))
  })
}

export const deletePost = (id, goalId) => (dispatch) => {
  api.delete('/posts/' + id).then((resp) => {
    dispatch(fetchPosts(goalId))
    // console.log(resp.data)
    // dispatch(removePostFunc(resp.data))
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
  dispatch(fetchTasks(id))    
  })
}

export const addSubTask  = (taskId, goalId, text) => (dispatch) => {
  api.post('/tasks/' + taskId + '/goals/' + goalId, {description: text}).then((resp) => {
  dispatch(fetchTasks(goalId))
  })
}

export const deleteTask = (goalId, id) => (dispatch) => {
  api.delete('/tasks/' + id).then((resp) => {
    dispatch(fetchTasks(goalId))
  })
}




export const selectUser = state => state.goal.user
export const selectGoals = state => state.goal.goals
export const selectGoal = state => state.goal.goal
export const selectTasks = state => state.goal.tasks
export const selectTask = state => state.goal.task
export const selectPosts = state => state.goal.posts
export const selectPost = state => state.goal.post

export default goalsSlice.reducer