import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/auth'
import goalReducer from '../features/components/goals/goalSlice'
import goalFormReducer from '../features/components/goals/goalFormSlice'

export default configureStore({
  reducer: {
    authState: authReducer,
    goal: goalReducer,
    goalForm: goalFormReducer,
  },
});
