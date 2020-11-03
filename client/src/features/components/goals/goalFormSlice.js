import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const goalFormSlice = createSlice({
  name: 'goalForm',
  initialState: {
    formIndex: 1,
    title: '',
    reason: '',
    tasks: [],
  },
  reducers: {
    incrementIndex: (state) => {
      state.formIndex += 1
    },
    decrementIndex: (state) => {
    state.formIndex -= 1
      // state.formIndex = 1 ? state.formIndex : state.formIndex -= 1
    },
    setTitleState: (state, action) => {
      state.title = action.payload
    },
    setReasonState: (state, action) => {
      state.reason = action.payload
    },
    setTasksState: (state, action) => {
      state.tasks = action.payload
    },
    clearGoalFormState: (state) => {
      state.title = ''
      state.reason = ''
      state.tasks = []
    },
    // submitGoalForm: (state, action) => {

    // }
  },
})

export const submitGoalForm = () => (dispatch) => {
  axios.post('/api/', {title: '', reason: '', }).then((resp) => {

  })

}

export const { incrementIndex, decrementIndex, setTitleState, setReasonState, setTasksState } = goalFormSlice.actions

export const selectFormIndex = state => state.goalForm.formIndex
export const selectTitle = state => state.goalForm.title
export const selectReason = state => state.goalForm.reason
export const selectTasks = state => state.goalForm.tasks


export default goalFormSlice.reducer