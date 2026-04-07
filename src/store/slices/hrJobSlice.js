import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hrJobService } from '../../services/hrJobService';

// Async Thunks
export const fetchJobs = createAsyncThunk(
  'hrJob/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await hrJobService.getJobs();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleJobStatus = createAsyncThunk(
  'hrJob/toggleJobStatus',
  async ({ jobId, status }, { rejectWithValue }) => {
    try {
      const response = await hrJobService.updateJobStatus(jobId, status);
      return { _id: jobId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createJob = createAsyncThunk(
  'hrJob/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await hrJobService.createJob(jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateJob = createAsyncThunk(
  'hrJob/updateJob',
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const response = await hrJobService.updateJob(jobId, jobData);
      return { _id: jobId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'hrJob/deleteJob',
  async (jobId, { rejectWithValue }) => {
    try {
      await hrJobService.deleteJob(jobId);
      return jobId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const hrJobSlice = createSlice({
  name: 'hrJob',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => { state.loading = true; })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data || action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(job => (job._id || job.id) !== action.payload);
      });
  },
});

export const { clearError } = hrJobSlice.actions;
export default hrJobSlice.reducer;