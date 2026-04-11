import { createSlice, isRejected } from "@reduxjs/toolkit";
import { fetchBarChart, fetchDashboardStats, fetchPieChart, fetchRecentCandidates } from "./dashboardThunks";

const initialState = {
    stats: {
        vacancies: 0,
        applicants: 0,
        accepted: 0,
        pending: 0,
        rejected: 0,
        failed: 0,
        processed: 0,
    },
    categories: {
        // Engineering: 45,
        // Design: 30,
        // Others: 25,
    },
    barData: {
        accepted: 0,
        rejected: 0,
        pending: 0,
    },
    selectedCategory: "All",
    applicantsData: [
        // { name: "Sarah Jenkins", score: 92, status: "accepted", category: "Engineering" },
        // { name: "Michael Chen", score: 78, status: "rejected", category: "Others" },
        // { name: "Emily Watson", score: 85, status: "accepted", category: "Design" },
        // { name: "Sarah Win", score: 52, status: "rejected", category: "Design" },
        // { name: "Sum Chen", score: 70, status: "pending", category: "Engineering" },
        // { name: "Anna Watson", score: 55, status: "pending", category: "Engineering" },
        // { name: "Daniel Lee", score: 70, status: "failed", category: "Design" },
        // { name: "Sophia Brown", score: 88, status: "processed", category: "Others" },
    ],
    activeJobs: [
        // {
        //     id: 1,
        //     title: "Senior Product Designer",
        //     applicants: 12,
        // },
        // {
        //     id: 2,
        //     title: "Fullstack Engineer",
        //     applicants: 45,
        // },
        // {
        //     id: 3,
        //     title: "Marketing Manager",
        //     applicants: 28,
        // },
        // {
        //     id: 4,
        //     title: "Data Scientist",
        //     applicants: 19,
        // },
    ],

    selectedJobId: null,
};

const mapStatus = (status) => {
    if (status === 'advanced') return 'accepted';
    if (status === 'rejected') return 'rejected';
    if (status === 'processed') return 'pending';
    return 'pending';
}

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
        setJobs(state, action) {
            state.activeJobs = action.payload;
        },
        setSelectedJob(state, action) {
            state.selectedJobId = action.payload;
        },
    },
    extraReducers: (builder) => {
        // stats card
        builder.addCase(fetchDashboardStats.fulfilled, (state, action) => {
            // console.log('Stats payload:', action.payload); // API response

            state.stats = {
                vacancies: action.payload.totalJobs,
                applicants: action.payload.totalApplicants,
                accepted: action.payload.acceptedApplicants,
                rejected: action.payload.rejectedApplicants,
                pending: action.payload.pendingApplicants,
                failed: state.stats.failed,
                processed: state.stats.processed,
            };

            // console.log('Updated stats:', state.stats);  // after mapping
        });

        // pie chart
        builder.addCase(fetchPieChart.fulfilled, (state, action) => {
            // console.log('Pie payload:', action.payload); // API response
            
            // transform array to object
            const categories = {};

            action.payload.forEach((item) => {
                categories[item.jobTitle] = {
                    percentage: item.percentage,
                    jobId: item.jobId,
                    type: item.type || 'job',
                };
            });

            // console.log('Pie API payload:', action.payload);

            state.categories = categories;
            // console.log('Updated categories:', state.categories); // after mapping
        });

        // bar chart
        builder.addCase(fetchBarChart.fulfilled, (state, action) => {
            state.barData = {
                accepted: action.payload.accepted ?? 0,
                rejected: action.payload.rejected ?? 0,
                pending: action.payload.pending ?? 0,
            };
        });

        // recent candidate
        builder.addCase(fetchRecentCandidates.fulfilled, (state, action) => {
            console.log('Recent candidates mapped:', action.payload);
            state.applicantsData = action.payload.map((item) => ({
                id: item.id,
                name: item.name,
                email: item.email,
                score: item.score ?? 0,
                status: mapStatus(item.status),
                appliedAt: item.appliedAt
            }));
        });
    },
});

export const {
    updateStats,
    setCategory,
    sortByName,
    sortByScore,
    setSelectedJob,
    setJobs,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;