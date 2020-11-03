import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/components/counter/counterSlice';
import authReducer from '../features/authentication/auth'
import goalReducer from '../features/components/goals/goalSlice'
import goalFormReducer from '../features/components/goals/goalFormSlice'

export default configureStore({
  reducer: {
    authState: authReducer,
    counter: counterReducer,
    goal: goalReducer,
    goalForm: goalFormReducer,
  },
});
