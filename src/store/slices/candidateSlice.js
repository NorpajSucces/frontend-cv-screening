import { createSlice } from '@reduxjs/toolkit';

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    candidates: [],
    loading: false,
    error: null,
  },
  reducers: {},
});

export default candidateSlice.reducer;