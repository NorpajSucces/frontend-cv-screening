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
    sortCandidatesByName: (state, action) => {
      const order = action.payload;
      state.candidates.sort((a, b) =>
        order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    },
    sortCandidatesByScore: (state, action) => {
      const order = action.payload;
      state.candidates.sort((a, b) => {
        const scoreA = a.aiScore || 0;
        const scoreB = b.aiScore || 0;
        return order === "asc" ? scoreA - scoreB : scoreB - scoreA;
      });
    },
  },
});

export const { setCandidates, sortCandidatesByName, sortCandidatesByScore } = candidateSlice.actions;
export default candidateSlice.reducer;