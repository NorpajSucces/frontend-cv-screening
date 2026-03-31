import { configureStore } from '@reduxjs/toolkit';
import jobReducer       from './slices/jobSlice';
import authReducer      from './slices/authSlice';
import candidateReducer from './slices/candidateSlice';
import hrJobReducer     from './slices/hrJobSlice';
import dashboardReducer from './slices/dashboardSlice';

const store = configureStore({
  reducer: {
    job:       jobReducer,
    auth:      authReducer,
    candidate: candidateReducer,
    hrJob:     hrJobReducer,
    dashboard: dashboardReducer,
  },
});

export default store;