import axiosInstance from './axiosInstance';

const jobService = {
  /**
   * Fetches all open job postings.
   * Supports optional query params: search, location, employmentType
   * @param {object} params - Optional query parameters
   * @returns {Promise} Axios response
   */
  getJobs: async (params = {}) => {
    const response = await axiosInstance.get('/jobs', { params });
    return response.data;
  },

  /**
   * Fetches a single job posting by its ID.
   * @param {string} id - The job posting MongoDB _id
   * @returns {Promise} Axios response
   */
  getJobById: async (id) => {
    const response = await axiosInstance.get(`/jobs/${id}`);
    return response.data;
  },
};

export default jobService;
