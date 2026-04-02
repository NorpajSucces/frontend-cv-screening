import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      totalJobs: 0,
      activeJobs: 0,
      totalApplications: 0,
      shortlistedCandidates: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStats, setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;