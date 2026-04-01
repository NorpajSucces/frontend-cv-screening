import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
});

export default dashboardSlice.reducer;
