import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalVacancies: 3,
    totalApplicants: 10,
    accepted: 3,
    pending: 2,

    selectedCategory: "All",

    categories: [
        { name: "Engineering", value: 5 },
        { name: "Design", value: 3 },
        { name: "Others", value: 2 },
    ],

    applicantsData: [
        { week: "Week 01", value: 2 },
        { week: "Week 02", value: 4 },
        { week: "Week 03", value: 3 },
        { week: "Week 04", value: 1 },
    ],

    tableData: [
        { name: "Sarah", score: 90, status: "Accepted", category: "Engineering" },
        { name: "John", score: 70, status: "Rejected", category: "Design" },
        { name: "Anna", score: 85, status: "Accepted", category: "Engineering" },
        { name: "Mike", score: 60, status: "Rejected", category: "Others" },
        { name: "Lisa", score: 88, status: "Accepted", category: "Design" },
    ],
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        updateStats: (state, action) => {
            const newData = action.payload;

            Object.assign(state, newData);

            // 🔥 AUTO UPDATE CHART BASED ON TOTAL APPLICANTS
            state.applicantsData = state.applicantsData.map((item) => ({
                ...item,
                value: Math.floor(state.totalApplicants / 4),
            }));

            // 🔥 UPDATE PIE CHART BASED ON TOTAL
            state.categories = [
                {
                    name: "Engineering",
                    value: Math.floor(state.totalApplicants * 0.5),
                },
                {
                    name: "Design",
                    value: Math.floor(state.totalApplicants * 0.3),
                },
                {
                    name: "Others",
                    value: Math.floor(state.totalApplicants * 0.2),
                },
            ];
        },

        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },

        sortByName: (state, action) => {
            const order = action.payload;
            state.tableData.sort((a, b) =>
                order === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            );
        },

        sortByScore: (state, action) => {
            const order = action.payload;
            state.tableData.sort((a, b) =>
                order === "asc" ? a.score - b.score : b.score - a.score
            );
        },
    },
});

export const { updateStats, setCategory, sortByName, sortByScore } =
    dashboardSlice.actions;

export default dashboardSlice.reducer;