import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collapsed: false,
    mobileOpen: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.collapsed = !state.collapsed;
        },
        toggleMobileSidebar(state) {
            state.mobileOpen = !state.mobileOpen;
        },
        closeMobileSidebar(state) {
            state.mobileOpen = false;
        },
    },
});

export const {
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;