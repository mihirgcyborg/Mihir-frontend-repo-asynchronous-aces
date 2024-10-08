import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
	name: "toggleSlice",
	initialState: {
		isRecruiter: false, // false means the user is a candidate, true means recruiter
	},
	reducers: {
		toggleBetweenRecruiterAndCandidate(state) {
			state.isRecruiter = !state.isRecruiter;
		},
		setRecruiter(state) {
			state.isRecruiter = true; // explicitly set recruiter state
		},
		setCandidate(state) {
			state.isRecruiter = false; // explicitly set candidate state
		},
	},
});

export const {
	toggleBetweenRecruiterAndCandidate,
	setRecruiter,
	setCandidate,
} = toggleSlice.actions;

export default toggleSlice.reducer;
