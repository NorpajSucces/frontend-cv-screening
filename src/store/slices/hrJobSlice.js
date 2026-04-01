import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hrJobService } from '../../services/hrJobService';

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
      return { jobId, ...response };
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
        state.jobs = action.payload;
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
        const jobIndex = state.jobs.findIndex(job => job.id === action.payload.jobId);
        if (jobIndex !== -1) {
          state.jobs[jobIndex] = { ...state.jobs[jobIndex], ...action.payload };
        }
      })
      .addCase(toggleJobStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = hrJobSlice.actions;
export default hrJobSlice.reducer;
