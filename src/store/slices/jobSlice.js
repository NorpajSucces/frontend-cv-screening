import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from '../../services/jobService';

// ASYNC THUNKS — Panggilan ke Backend API

/**
 * Fetches all open jobs for the public job listing page.
 */
export const fetchPublicJobs = createAsyncThunk(
  'job/fetchPublicJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await jobService.getJobs();
      // Backend returns: { success: true, data: [...] }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Fetches a single job posting by ID for the job detail page.
 */
export const fetchJobById = createAsyncThunk(
  'job/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await jobService.getJobById(id);
      // Backend returns: { success: true, data: { job object } }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Job not found.');
    }
  }
);

// ============================================================
// SLICE


const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs:        [],        // Daftar semua loker untuk halaman JobList
    selectedJob: null,      // Loker yang sedang dilihat di halaman JobDetail
    loading:     false,
    error:       null,
  },
  reducers: {
    /**
     * Resets selectedJob to null when leaving the detail page.
     * Prevents showing stale data when navigating to a new job.
     */
    clearSelectedJob: (state) => {
      state.selectedJob = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchPublicJobs ---
      .addCase(fetchPublicJobs.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchPublicJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs    = action.payload || [];
      })
      .addCase(fetchPublicJobs.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // --- fetchJobById ---
      .addCase(fetchJobById.pending, (state) => {
        state.loading     = true;
        state.error       = null;
        state.selectedJob = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading     = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;