import { createSlice } from '@reduxjs/toolkit'

export const goalFormSlice = createSlice({
  name: 'goalForm',
  initialState: {
    formIndex: 1,
  },
  reducers: {
    incrementIndex: (state) => {
      state.formIndex += 1
    },
    decrementIndex: (state) => {
    state.formIndex -= 1
      // state.formIndex = 1 ? state.formIndex : state.formIndex -= 1
    },
  },
})

export const { incrementIndex, decrementIndex } = goalFormSlice.actions

export const selectFormIndex = state => state.goalForm.formIndex

export default goalFormSlice.reducer