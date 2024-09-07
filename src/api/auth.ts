import { UserProfileData } from '@/types/type';
import axios, { AxiosResponse } from 'axios';

interface SignupResponse {
  userId: string;
  email: string;
  token: string;
}

interface SignupRequest {
  email: string;
  password: string;
}



// API to handle initial signup
export const signupUser = async (data: SignupRequest): Promise<SignupResponse> => {
    try {
      const response: AxiosResponse<SignupResponse> = await axios.post('/api/auth/signup', data);
      return response.data;
    } catch (error) {
      console.error('Error signing up user:', error);
      throw error;
    }
  };

  // API to handle profile completion
export const completeUserProfile = async (userData: UserProfileData): Promise<void> => {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (userData[key as keyof UserProfileData] !== null) {
          formData.append(key, userData[key as keyof UserProfileData] as string | Blob);
        }
      });
  
      await axios.post('/api/auth/complete-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error('Error completing user profile:', error);
      throw error;
    }
  };

  export const loginUser = async (email: string, password: string) => {
	try {
		const response = await axios.post("/api/auth/login", { email, password });
		return response.data;
	} catch (error) {
		throw new Error("An error occurred during login.");
	}
};