'use client'
import { Job, JobState } from "@/types/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const initialState:JobState={
    jobs:[{
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      jobType: "Full-time",
      recruitmentQuota: "2",
      experiences: "2+ years",
      location: "Remote",
      salary: "$80,000 - $100,000",
      status: "active",
      candidatesApplied: "10",
    },
    {
      id: 2,
      title: "Marketing Manager",
      department: "Marketing",
      jobType: "Full-time",
      recruitmentQuota: "1",
      experiences: "5+ years",
      location: "San Francisco, CA",
      salary: "$120,000 - $140,000",
      status: "active",
      candidatesApplied: "10",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      jobType: "Full-time",
      recruitmentQuota: "1",
      experiences: "3+ years",
      location: "New York, NY",
      salary: "$90,000 - $110,000",
      status: "inactive",
      candidatesApplied: "10",
    },
    {
      id: 4,
      title: "Content Writer",
      department: "Marketing",
      jobType: "Part-time",
      recruitmentQuota: "1",
      experiences: "2+ years",
      location: "Remote",
      salary: "$40,000 - $50,000",
      status: "inactive",
      candidatesApplied: "10",
    },
    {
      id: 5,
      title: "UI/UX Designer",
      department: "Design",
      jobType: "Full-time",
      recruitmentQuota: "1",
      experiences: "3+ years",
      location: "New York, NY",
      salary: "$90,000 - $110,000",
      status: "active",
      candidatesApplied: "10",
    },
    {
      id: 6,
      title: "UI/UX Designer",
      department: "Design",
      jobType: "Full-time",
      recruitmentQuota: "1",
      experiences: "3+ years",
      location: "New York, NY",
      salary: "$90,000 - $110,000",
      status: "active",
      candidatesApplied: "10",
    }],
    selectedStatus: 'active',
    selectedDepartment: 'all',
} 

const jobSlice = createSlice({
    name:"jobs",
    initialState,
    reducers:{
        setJobs(state, action: PayloadAction<Job[]>) {
            state.jobs = action.payload;
          },
       
        updateJob: (state, action: PayloadAction<Job>) => {
            const index = state.jobs.findIndex((job) => job.id === action.payload.id);
            if (index !== -1) {
              state.jobs[index] = action.payload;
            }
          },
          setSelectedStatus(state, action: PayloadAction<'active' | 'inactive'>) {
            state.selectedStatus = action.payload;
          },
          setSelectedDepartment(state, action: PayloadAction<string>) {
            state.selectedDepartment = action.payload;
          },
          addJob(state, action: PayloadAction<Job>) {
            state.jobs.push(action.payload);
          },
    }

});

export const { addJob, updateJob, setJobs, setSelectedStatus, setSelectedDepartment } = jobSlice.actions;
export default jobSlice.reducer;