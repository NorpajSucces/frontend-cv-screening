import axiosInstance from './axiosInstance';

const API_BASE = 'http://localhost:5000/api';

const candidateService = {
    // get candaidate detail for CV summary
    cvSummary: async (id) => {
        const response = await axiosInstance.get(`/candidates/${id}`);
        return response.data;
    },

    // get candidate by job
    getByJob: async (jobId) => {
        const response = await axiosInstance.get(`/candidates/jobs/${jobId}`);
        return response.data;
    },

    // accept candidate
    accept: async (id) => {
        const response = await axiosInstance.put(`/candidates/${id}/accept`);
        return response.data;
    },

    // reject candidate
    reject: async (id) => {
        const response = await axiosInstance.put(`/candidates/${id}/reject`);
        return response.data;
    },

    // CV download (not axios)
    downloadCV: (id) => {
        window.open(`${API_BASE}/candidates/${id}/download-cv`, '_blank');
    }
};

export default candidateService;