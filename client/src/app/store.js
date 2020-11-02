import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/components/counter/counterSlice';
import authReducer from '../features/authentication/auth'

export default configureStore({
  reducer: {
    authState: authReducer,
    counter: counterReducer,
  },
});
