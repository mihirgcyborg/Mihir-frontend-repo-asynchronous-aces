'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    token:string |null;
    isAuthenticated:boolean;
}

const initialState: AuthState = {
    token:null,
    isAuthenticated:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action: PayloadAction<string>)=>{
            state.token = action.payload;
            state.isAuthenticated=true;
        },
        logout:(state)=>{
            state.token = null;
            state.isAuthenticated=false;
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
          },
    }
})

export const {login, logout,setToken} = authSlice.actions;

export default authSlice.reducer;