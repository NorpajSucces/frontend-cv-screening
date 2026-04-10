import { createSlice, isRejected } from "@reduxjs/toolkit";

const initialState = {
    stats: {
        vacancies: 3,
        applicants: 10,
        accepted: 4,
        pending: 5,
        rejected: 2,
        failed: 1,
        processed: 3,
    },
    categories: {
        Engineering: 45,
        Design: 30,
        Others: 25,
    },
    selectedCategory: "All",
    applicantsData: [
            { name: "Sarah Jenkins", score: 92, status: "accepted", jobId: 1 },
            { name: "Michael Chen", score: 78, status: "rejected", jobId: 2 },
            { name: "Emily Watson", score: 85, status: "accepted", jobId: 3 },
            { name: "Sarah Win", score: 52, status: "rejected", jobId: 4 },
            { name: "Sum Chen", score: 70, status: "pending", jobId: 1 },
            { name: "Anna Watson", score: 55, status: "pending", jobId: 2 },
            { name: "Daniel Lee", score: 70, status: "failed", jobId: 3 },
            { name: "Sophia Brown", score: 88, status: "processed", jobId: 4 },
            { name: "James Carter", score: 81, status: "accepted", jobId: 1 },
            { name: "Olivia Smith", score: 67, status: "pending", jobId: 2 },
            
            { name: "Liam Johnson", score: 74, status: "rejected", jobId: 3 },
            { name: "Emma Davis", score: 90, status: "accepted", jobId: 4 },
            { name: "Noah Wilson", score: 60, status: "pending", jobId: 1 },
            { name: "Ava Martinez", score: 77, status: "processed", jobId: 2 },
            { name: "William Anderson", score: 69, status: "failed", jobId: 3 },
            { name: "Mia Taylor", score: 84, status: "accepted", jobId: 4 },
            { name: "Ethan Thomas", score: 58, status: "rejected", jobId: 1 },
            { name: "Isabella Moore", score: 93, status: "accepted", jobId: 2 },
            
            { name: "Lucas Jackson", score: 72, status: "pending", jobId: 3 },
            { name: "Charlotte White", score: 65, status: "processed", jobId: 4 },
            { name: "Benjamin Harris", score: 79, status: "accepted", jobId: 1 },
            { name: "Amelia Martin", score: 87, status: "accepted", jobId: 2 },
            { name: "Henry Thompson", score: 54, status: "failed", jobId: 3 },
            { name: "Evelyn Garcia", score: 76, status: "pending", jobId: 4 },
            { name: "Alexander Martinez", score: 82, status: "accepted", jobId: 1 },
            { name: "Harper Robinson", score: 71, status: "processed", jobId: 2 },
            { name: "Michael Clark", score: 63, status: "rejected", jobId: 3 },
            { name: "Abigail Rodriguez", score: 89, status: "accepted", jobId: 4 },
            
            { name: "Daniel Lewis", score: 68, status: "pending", jobId: 1 },
            { name: "Emily Lee", score: 91, status: "accepted", jobId: 2 },
            { name: "Matthew Walker", score: 57, status: "failed", jobId: 3 },
            { name: "Ella Hall", score: 73, status: "processed", jobId: 4 },
            { name: "Joseph Allen", score: 80, status: "accepted", jobId: 1 },
            { name: "Scarlett Young", score: 66, status: "rejected", jobId: 2 },
            { name: "David King", score: 75, status: "pending", jobId: 3 },
            { name: "Grace Wright", score: 88, status: "accepted", jobId: 4 },
            { name: "Andrew Scott", score: 62, status: "failed", jobId: 1 },
            { name: "Chloe Green", score: 85, status: "accepted", jobId: 2 },
            
            { name: "Joshua Adams", score: 70, status: "pending", jobId: 3 },
            { name: "Victoria Baker", score: 78, status: "processed", jobId: 4 },
            { name: "Christopher Nelson", score: 83, status: "accepted", jobId: 1 },
            { name: "Lily Carter", score: 59, status: "rejected", jobId: 2 },
            { name: "Nathan Mitchell", score: 64, status: "failed", jobId: 3 },
            { name: "Zoe Perez", score: 92, status: "accepted", jobId: 4 },
            { name: "Ryan Roberts", score: 77, status: "pending", jobId: 1 },
            { name: "Hannah Turner", score: 86, status: "accepted", jobId: 2 },
            { name: "Brandon Phillips", score: 61, status: "rejected", jobId: 3 },
            { name: "Natalie Campbell", score: 90, status: "accepted", jobId: 4 }
            
    ],
    activeJobs: [
        {
            id: 1,
            title: "Senior Product Designer",
            applicants: 12,
            status: "open",
        },
        {
            id: 2,
            title: "Fullstack Engineer",
            applicants: 45,
            status: "closed",
        },
        {
            id: 3,
            title: "Marketing Manager",
            applicants: 28,
            status: "open",
        },
        {
            id: 4,
            title: "Data Scientist",
            applicants: 19,
            status: "closed",
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