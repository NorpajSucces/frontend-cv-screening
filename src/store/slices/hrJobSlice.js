import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hrJobService } from '../../services/hrJobService';

export const fetchJobs = createAsyncThunk(
  'hrJob/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await hrJobService.getJobs();
      return response.data; // The array of jobs
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
      return response.data; // { _id, title, status }
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
      return response.data; // the created job object
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
      return response.data; // the updated job object
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'hrJob/deleteJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await hrJobService.deleteJob(jobId);
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
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data || action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Status
      .addCase(toggleJobStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleJobStatus.fulfilled, (state, action) => {
        state.loading = false;
        const jobIndex = state.jobs.findIndex(job => job._id === action.payload._id);
        if (jobIndex !== -1) {
          state.jobs[jobIndex] = { ...state.jobs[jobIndex], ...action.payload };
        }
      })
      .addCase(toggleJobStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        const jobIndex = state.jobs.findIndex(job => job._id === action.payload._id);
        if (jobIndex !== -1) {
          state.jobs[jobIndex] = { ...state.jobs[jobIndex], ...action.payload };
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter(job => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = hrJobSlice.actions;
export default hrJobSlice.reducer;
