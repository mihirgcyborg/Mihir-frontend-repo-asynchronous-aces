import { UserProfileData } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




// Initial state for user profile
const initialState: UserProfileData = {
  email: undefined,
  firstName: '',
  lastName: '',
  phone: '',
  calendlyUserName: '',
  avatar: null,
  department: '',
  jobTitle: '',
  experience: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    // Action to update email after signup
    updateEmail(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email;
    },
    // Action to update profile after profile completion
    updateProfile(state, action: PayloadAction<UserProfileData>) {
      return { ...state, ...action.payload }; // Merges the updated profile fields
    },
    // Optionally, you can have a resetProfile if needed
    resetProfile(state) {
      return initialState;
    },
  },
});

export const { updateEmail, updateProfile, resetProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
