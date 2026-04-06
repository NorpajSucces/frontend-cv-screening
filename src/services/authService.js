import axiosInstance from './axiosInstance';

const authService = {
  login: async (credentials) => {
    // Axios base URL already includes '/api', so we use '/auth/login'
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await axiosInstance.put('/auth/change-password', passwordData);
    return response.data;
  }
};

export default authService;
