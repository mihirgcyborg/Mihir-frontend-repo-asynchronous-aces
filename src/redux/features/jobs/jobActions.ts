'use client'
import { Dispatch } from '@reduxjs/toolkit';
import { setJobs } from './jobSlice';

import { Job } from '@/types/type';
import { fetchJobs } from '@/api/jobs';



export const fetchJobsAsync = () => async (dispatch: Dispatch) => {
    try {
        const jobs = await fetchJobs();
        dispatch(setJobs(jobs as Job[]));
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
    }
};