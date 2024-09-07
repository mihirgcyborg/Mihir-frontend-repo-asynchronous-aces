import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
	name: "toggleSlice",
	initialState: {
		isRecruiter: false, // false means the user is a candidate, true means recruiter
	},
	reducers: {
		toggleBetweenRecruiterAndCandidate(state) {
			console.log(state.isRecruiter, "before");
			state.isRecruiter = !state.isRecruiter;
			console.log(state.isRecruiter, "after");
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
