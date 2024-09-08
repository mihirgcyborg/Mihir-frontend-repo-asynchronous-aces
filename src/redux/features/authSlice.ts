'use client'
import { user } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";

interface AuthState{
    currentUser:user | null,
    isLoading:boolean,
    error:string | null;
}

const initialState: AuthState = {
    currentUser:null,
    isLoading:false,
    error:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCurrentUser:(state,action:PayloadAction<user | null>)=>{
           
            state.currentUser = action.payload;
            
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.isLoading=action.payload;
        },
        setError:(state,action:PayloadAction<string | null>)=>{
            state.error = action.payload;
        },
        clearError:(state) =>{
            state.error = null;
        },
    }
})

export const {setCurrentUser,setLoading,setError,clearError} = authSlice.actions;

export default authSlice.reducer;