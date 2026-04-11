import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBarChart, getPieChart, getRecentCandidates, getStats } from "../../api/dashboardApi";

export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchStats',
    async (_, thunkAPI) => {
        try {
            const response = await getStats(); // should return { totalJobs, totalApplicants, acceptedApplicants, ... }
            // console.log('Response data:', response.data);
            return response.data; 
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchPieChart = createAsyncThunk(
    'dashboard/fetchPieChart',
    async (_, thunkAPI) => {
        try {
            const response = await getPieChart();
            // console.log('Pie API:', response.data);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchBarChart = createAsyncThunk(
    'dashboard/fetchBarChart',
    async(params, thunkAPI) => {
        try {
            const response = await getBarChart(params);
            // console.log('Bar API response:', response.data);
            // console.log('PARAMS SENT:', params);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchRecentCandidates = createAsyncThunk(
    'dashboard/fetchRecentCandidates',
    async(_, thunkAPI) => {
        try {
            const response = await getRecentCandidates();
            console.log('Recent Candidates API:', response.data);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);