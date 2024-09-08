"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/store"; // Adjust import if needed
import { setCurrentUser, setError } from "@/redux/features/authSlice";
import { setCandidate, setRecruiter } from "@/redux/features/toggle/toogle";
import { user } from "@/types/type";

const withAuth = (WrappedComponent: React.ComponentType) => {
	return (props: any) => {
		const router = useRouter();
		const dispatch = useAppDispatch();
		useEffect(() => {
			// Check for token in cookies
			const uIdFromCookie = Cookies.get("userUid");

			// Check for token in localStorage
			const tokenFromLocalStorage = localStorage.getItem("userUid");

			// Check for token in sessionStorage
			const tokenFromSessionStorage = sessionStorage.getItem("userUid");

			const email =
				localStorage.getItem("userEmail") ||
				sessionStorage.getItem("userEmail");
			const role =
				localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

			// Determine if any token is present
			const uid =
				uIdFromCookie || tokenFromLocalStorage || tokenFromSessionStorage;

			// Dispatch actions if user is authenticated
			dispatch(setCurrentUser({ uid, email } as user)); // Update this if you need more user data
			if (role === "recruiter") {
				dispatch(setRecruiter());
			} else if (role === "candidate") {
				dispatch(setCandidate());
			}
			if (!email || !role || !uid) {
				router.replace("/login");
				return;
			}
		}, [router]);

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
