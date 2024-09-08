import { UserProfileData } from '@/types/type';
import axios, { AxiosResponse } from 'axios';
import { logoutWithFireBase, signInWithFireBase, signUpWithFireBase} from "../firebase/auth"
import { createUserWithEmailAndPassword } from 'firebase/auth';
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
export const signUpUser = async (email: string, password: string,role:"recruiter"|"candidate") => {
    try {
      // const response: AxiosResponse<SignupResponse> = await axios.post('/api/auth/signup', data);

      //fireBase
      const userData =  signUpWithFireBase( email, password,role);
     
      return userData;
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
		// const response = await axios.post("/api/auth/login", { email, password });


    // firebase:- 
    const userData = await signInWithFireBase(email,password);
		return userData;
	} catch (error) {
		throw error;
	}
};


export const logoutUser = async () => {
  try {
    await logoutWithFireBase();
    
    // Clear session storage
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userUid');
    sessionStorage.removeItem('userRole');
    
    // You might want to clear any other app-specific storage here
    
    console.log('User logged out successfully');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};