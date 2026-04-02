import { createSlice } from '@reduxjs/toolkit';

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    data: null,
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCandidate: (state, action) => {
      state.data = action.payload;
    },
    setCandidateList: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCandidate, setCandidateList, setLoading, setError } = candidateSlice.actions;
export default candidateSlice.reducer;