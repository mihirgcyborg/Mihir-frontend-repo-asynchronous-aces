'use client'
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./features/authSlice"
import jobReducer from './features/jobs/jobSlice';
import userProfileReducer from "./features/userProfile/userProfileSlice"
import toggleReducer from "./features/toggle/toogle"
export const store = configureStore({
    reducer:{
        jobs: jobReducer,
        auth:authReducer,
        userProfile:userProfileReducer,
        toggle:toggleReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch:()=>typeof store.dispatch= useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>= useSelector;