import axiosInstance from './axiosInstance';

export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post('/api/auth/logout');
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await axiosInstance.put('/api/auth/change-password', passwordData);
    return response.data;
  }
};

