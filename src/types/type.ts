export interface Job {
	docId?:string;
	id: string;
	title: string;
	department: string;
	jobType: string;
	recruitmentQuota: string;
	experiences: string;
	location: string;
	salary: string;
	status?: "active" | "inactive";
	candidatesApplied?: number;
	createdBy:string | undefined;
}

export interface JobState {
    jobs: Job[];
    selectedStatus: 'active' | 'inactive';
    selectedDepartment: string;
	isLoading: boolean;
  }


 export interface UserProfileData {
	email?: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	calendlyUserName?: string;
	avatar?: File | null;
	department?: string;
	jobTitle?: string;
	experience?: number |null;
  }

  export type user={
    uid:string;
    email:string;
 }