import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Placeholder thunks
export const fetchJobs = createAsyncThunk('hrJob/fetchJobs', async () => []);
export const createJob = createAsyncThunk('hrJob/createJob', async (data) => data);
export const deleteJob = createAsyncThunk('hrJob/deleteJob', async (id) => id);
export const toggleJobStatus = createAsyncThunk('hrJob/toggleJobStatus', async (data) => data);
export const updateJob = createAsyncThunk('hrJob/updateJob', async (data) => data);

const hrJobSlice = createSlice({
  name: 'hrJob',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => { state.loading = true; })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = hrJobSlice.actions;
export default hrJobSlice.reducer;