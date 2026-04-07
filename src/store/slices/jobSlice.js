import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { JOBS } from '../../constants';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  try {
    const response = await axios.get('http://localhost:3000/jobs');
    return response.data;
  } catch (error) {
    // Fallback ke data lokal jika API belum tersedia
    return JOBS;
  }
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
