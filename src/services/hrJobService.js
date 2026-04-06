import axiosInstance from './axiosInstance';

export const hrJobService = {
  getJobs: async () => {
    const response = await axiosInstance.get('/hr/jobs');
    return response.data;
  },

  updateJobStatus: async (jobId, status) => {
    const response = await axiosInstance.patch(`/hr/jobs/${jobId}/status`, { status });
    return response.data;
  },

  // Additional methods for completeness
  createJob: async (jobData) => {
    const response = await axiosInstance.post('/hr/jobs', jobData);
    return response.data;
  },

  updateJob: async (jobId, jobData) => {
    const response = await axiosInstance.put(`/hr/jobs/${jobId}`, jobData);
    return response.data;
  },

  deleteJob: async (jobId) => {
    const response = await axiosInstance.delete(`/hr/jobs/${jobId}`);
    return response.data;
  }
};

