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
        { name: "Sarah Jenkins", score: 92, status: "accepted", category: "Engineering" },
        { name: "Michael Chen", score: 78, status: "rejected", category: "Others" },
        { name: "Emily Watson", score: 85, status: "accepted", category: "Design" },
        { name: "Sarah Win", score: 52, status: "rejected", category: "Design" },
        { name: "Sum Chen", score: 70, status: "pending", category: "Engineering" },
        { name: "Anna Watson", score: 55, status: "pending", category: "Engineering" },
        { name: "Daniel Lee", score: 70, status: "failed", category: "Design" },
        { name: "Sophia Brown", score: 88, status: "processed", category: "Others" },
        { name: "James Carter", score: 81, status: "accepted", category: "Engineering" },
        { name: "Olivia Smith", score: 67, status: "pending", category: "Design" },
        { name: "Liam Johnson", score: 74, status: "rejected", category: "Others" },
        { name: "Emma Davis", score: 90, status: "accepted", category: "Design" },
        { name: "Noah Wilson", score: 60, status: "pending", category: "Engineering" },
        { name: "Ava Martinez", score: 77, status: "processed", category: "Others" },
        { name: "William Anderson", score: 69, status: "failed", category: "Engineering" },
        { name: "Mia Taylor", score: 84, status: "accepted", category: "Design" },
        { name: "Ethan Thomas", score: 58, status: "rejected", category: "Others" },
        { name: "Isabella Moore", score: 93, status: "accepted", category: "Design" },

        { name: "Lucas Jackson", score: 72, status: "pending", category: "Engineering" },
        { name: "Charlotte White", score: 65, status: "processed", category: "Others" },
        { name: "Benjamin Harris", score: 79, status: "accepted", category: "Engineering" },
        { name: "Amelia Martin", score: 87, status: "accepted", category: "Design" },
        { name: "Henry Thompson", score: 54, status: "failed", category: "Others" },
        { name: "Evelyn Garcia", score: 76, status: "pending", category: "Design" },
        { name: "Alexander Martinez", score: 82, status: "accepted", category: "Engineering" },
        { name: "Harper Robinson", score: 71, status: "processed", category: "Others" },
        { name: "Michael Clark", score: 63, status: "rejected", category: "Engineering" },
        { name: "Abigail Rodriguez", score: 89, status: "accepted", category: "Design" },

        { name: "Daniel Lewis", score: 68, status: "pending", category: "Engineering" },
        { name: "Emily Lee", score: 91, status: "accepted", category: "Design" },
        { name: "Matthew Walker", score: 57, status: "failed", category: "Others" },
        { name: "Ella Hall", score: 73, status: "processed", category: "Design" },
        { name: "Joseph Allen", score: 80, status: "accepted", category: "Engineering" },
        { name: "Scarlett Young", score: 66, status: "rejected", category: "Others" },
        { name: "David King", score: 75, status: "pending", category: "Engineering" },
        { name: "Grace Wright", score: 88, status: "accepted", category: "Design" },
        { name: "Andrew Scott", score: 62, status: "failed", category: "Others" },
        { name: "Chloe Green", score: 85, status: "accepted", category: "Design" },

        { name: "Joshua Adams", score: 70, status: "pending", category: "Engineering" },
        { name: "Victoria Baker", score: 78, status: "processed", category: "Others" },
        { name: "Christopher Nelson", score: 83, status: "accepted", category: "Engineering" },
        { name: "Lily Carter", score: 59, status: "rejected", category: "Design" },
        { name: "Nathan Mitchell", score: 64, status: "failed", category: "Others" },
        { name: "Zoe Perez", score: 92, status: "accepted", category: "Design" },
        { name: "Ryan Roberts", score: 77, status: "pending", category: "Engineering" },
        { name: "Hannah Turner", score: 86, status: "accepted", category: "Design" },
        { name: "Brandon Phillips", score: 61, status: "rejected", category: "Others" },
        { name: "Natalie Campbell", score: 90, status: "accepted", category: "Design" }
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