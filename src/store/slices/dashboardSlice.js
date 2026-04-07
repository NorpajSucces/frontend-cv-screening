import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stats: {
        vacancies: 3,
        applicants: 10,
        accepted: 4,
        pending: 5,
    },
    categories: {
        Engineering: 45,
        Design: 30,
        Others: 25,
    },
    selectedCategory: "All",
    applicantsData: [
        { name: "Sarah Jenkins", score: 92, status: "accepted", category: "Engineering" },
        { name: "Michael Chen", score: 78, status: "rejected", category: "Engineering" },
        { name: "Emily Watson", score: 85, status: "accepted", category: "Engineering" },
    ],
    activeJobs: [
        {
            id: 1,
            title: "Senior Product Designer",
            applicants: 12,
        },
        {
            id: 2,
            title: "Fullstack Engineer",
            applicants: 45,
        },
        {
            id: 3,
            title: "Marketing Manager",
            applicants: 28,
        },
        {
            id: 4,
            title: "Data Scientist",
            applicants: 19,
        },
    ],

    selectedJobId: 1,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        updateStats(state, action) {
            state.stats = { ...state.stats, ...action.payload };
        },
        setCategory(state, action) {
            state.selectedCategory = action.payload;
        },
        sortByName(state, action) {
            const order = action.payload;
            state.applicantsData.sort((a, b) =>
                order === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            );
        },
        sortByScore(state, action) {
            const order = action.payload;
            state.applicantsData.sort((a, b) =>
                order === "asc" ? a.score - b.score : b.score - a.score
            );
        },
        setSelectedJob(state, action) {
            state.selectedJobId = action.payload;
        },
    },
});

export const {
    updateStats,
    setCategory,
    sortByName,
    sortByScore, 
    setSelectedJob,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
