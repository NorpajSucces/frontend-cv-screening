import { createSlice } from '@reduxjs/toolkit';

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    candidates: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
  },
});

export const { setCandidates } = candidateSlice.actions;
export default candidateSlice.reducer;