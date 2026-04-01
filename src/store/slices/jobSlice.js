import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
});

export default jobSlice.reducer;
