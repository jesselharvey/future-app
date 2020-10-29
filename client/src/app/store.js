import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/components/counter/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
