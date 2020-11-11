import { createSlice } from '@reduxjs/toolkit'
import api from '../../../utils/request'

export const goalFormSlice = createSlice({
  name: "goalForm",
  initialState: {
    formIndex: 1,
    title: '',
    reason: '',
    tasks: [],
    date: '',
    time: '',
  },
  reducers: {
    incrementIndex: (state, action) => {state.formIndex += 1},
    decrementIndex: (state, action) => {state.formIndex -= 1},
    setTitleState: (state, action) => {state.title = action.payload},
    setReasonState: (state, action) => {state.reason = action.payload},
    setTasksState: (state, action) => {state.tasks = action.payload},
    setDateState: (state, action) => {state.date = action.payload},
    setTimeState: (state, action) => {state.time = action.payload},
    clearAllForms: (state) => {
      state.formIndex = 1,
      state.title = '',
      state.reason = '',
      state.task = [],
      state.date = '',
      state.time = ''
    }
  },  
})

export const { incrementIndex, decrementIndex, setTitleState, setReasonState, setTasksState, setDateState, setTimeState, clearAllForms } = goalFormSlice.actions

export const submitGoalForm = (title, reason, date, time) => () => {
  return api.post('/goals/users', {title: title, reason: reason, date: date, time: time})
}


export const selectFormIndex = state => state.goalForm.formIndex
export const selectTitle = state => state.goalForm.title
export const selectReason = state => state.goalForm.reason
export const selectTasks = state => state.goalForm.tasks
export const selectDate = state => state.goalForm.date
export const selectTime = state => state.goalForm.time


export default goalFormSlice.reducer