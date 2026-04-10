import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Extract token and user from localStorage safely
const userStr = localStorage.getItem('user');
const storedUser = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
const storedToken = localStorage.getItem('token') || null;

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

// Async thunk for login integration
export const loginHR = createAsyncThunk(
  'auth/loginHR',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      // The backend returns structural { success: true, data: { token, user }, message: "..." }
      // So we must extract it from response.data
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Return only the payload { token, user } to extraReducers
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginHR.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginHR.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;