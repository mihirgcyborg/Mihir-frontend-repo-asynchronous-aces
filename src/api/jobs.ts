import { collection, doc, getDocs, addDoc, updateDoc, query, where, DocumentData, setDoc } from "firebase/firestore";
 // Adjust the path as necessary
import { Job } from '@/types/type';
import { db } from "@/firebase/firebaseConfig";
import JobDetails from "@/app/(dashboard)/dashboard/job-details/[id]/page";

// Fetch jobs
export const fetchJobs = async (): Promise<Job[]> => {
    const jobsCollection = collection(db, 'jobs');
    const jobsQuery = query(jobsCollection, where('status', '!=', 'deleted')); // Example: fetch only non-deleted jobs
    const querySnapshot = await getDocs(jobsQuery);
    
    return querySnapshot.docs.map((doc) => {
        const jobData = doc.data() as Job;
        return {
            docId: doc.id,  // Assign the document ID here
            ...jobData,  // Spread the rest of the job data
        };
    }) as Job[];
};

// Create a new job
export const createJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
    const jobsCollection = collection(db, 'jobs');
    const jobData = {
        ...job,
        createdBy: job.createdBy || sessionStorage.getItem("userUid") || localStorage.getItem("userUid")|| "unknown_user",  // Provide a fallback if createdBy is undefined
    };
    const docRef = await addDoc(jobsCollection, jobData);
  
  // Now create a corresponding jobdetails document
  
  const jobDetailsData: JobDetails = {
    id: docRef.id,  // Use the same ID as the job ID
    title: job.title,
    department: job.department,
    jobType: job.jobType,
    recruitmentQuota: job.recruitmentQuota,
    experiences: job.experiences,
    location: job.location,
    salary: job.salary,
    status: job.status ?? "active",  // Default status if not provided
    createdDate: new Date(),  // Use current date for createdDate
    hiringManager: "",  // Set as empty for now
    skills: [],  // Initialize empty array for skills
    attachments: [],  // Initialize empty array for attachments
    jobDescription: '<h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Job Description:</h3><p>Enter Job Description</p><h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Responsibilities:</h3><ul style="list-style-type: disc; padding-left: 20px;"><li>Responsibility 1</li><li>Responsibility 2</li><li>Responsibility 3</li></ul><h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Requirements:</h3><ul style="list-style-type: disc; padding-left: 20px;"><li>Requirement 1</li><li>Requirement 2</li><li>Requirement 3</li></ul>',
};

  // Add the jobDetails document with the job ID
  await setDoc(doc(db, 'jobdetails', docRef.id), jobDetailsData);
    
    return {
        id: docRef.id,  // Return the new document ID
        ...job,         // Spread the rest of the job data
    };
};


// Update an existing job
export const updateJob = async (job: Job): Promise<Job> => {
    const { id, ...jobData } = job;  // Separate id from the rest of the job data
    const jobDocRef = doc(db, 'jobs', id.toString());
    
    await updateDoc(jobDocRef, jobData);  // Update the document without sending the id field

    return job;  // Return the full job object, including the id
};

