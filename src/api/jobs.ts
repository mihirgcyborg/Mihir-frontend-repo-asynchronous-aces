import axios from 'axios';
import { Job } from '@/types/type';

// Fetch jobs
export const fetchJobs = async (): Promise<Job[]> => {
    const response = await axios.get('/api/jobs');
    return response.data;
};

// Create a new job
export const createJob = async (job: Job): Promise<Job> => {
    const response = await axios.post('/api/jobs', job);
    return response.data;
};

// Update an existing job
export const updateJob = async (job: Job): Promise<Job> => {
    const response = await axios.put(`/api/jobs/${job.id}`, job);
    return response.data;
};
