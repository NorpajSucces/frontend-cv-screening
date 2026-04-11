import apiClient from './client';

// stats card
export const getStats = () => {
    return apiClient.get('/dashboard/stats');
};

// pie chart
export const getPieChart = () => {
    return apiClient.get('/dashboard/job-distribution');
};

// bar chart
export const getBarChart = (params) => {
    return apiClient.get('/dashboard/job-status', {
        params, // { jobId } or { type: 'others' }
    });
};

// recent applied candidateds
export const getRecentCandidates = () => {
    return apiClient.get('/dashboard/recent-candidate');
};