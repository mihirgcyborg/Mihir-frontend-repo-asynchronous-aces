import { auth } from "./firebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

// Initialize Firestore
const firestore = getFirestore();

export const signInWithFireBase = async (email, password) => {
	try {
		// Sign in with Firebase Auth
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const { user } = userCredential;

		// Retrieve the user document from Firestore
		const userDocRef = doc(firestore, "users", user.uid);
		const userDocSnap = await getDoc(userDocRef);

		if (userDocSnap.exists()) {
			const userData = userDocSnap.data();
			return {
				uid: user.uid,
				email: user.email,
				role: userData.role, // Get role from Firestore
			};
		} else {
			throw new Error("User data does not exist in Firestore.");
		}
	} catch (error) {
		console.error("Error signing in user:", error);
		throw error;
	}
};

export const signUpWithFireBase = async (email, password, role) => {
	try {
		// Create user with Firebase Auth
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const { user } = userCredential;

		// Store user data (including role) in Firestore
		await setDoc(doc(firestore, "users", user.uid), {
			uid: user.uid,
			email: user.email,
			role: role, // Store the role
		});

		const userData = {
			uid: user.uid,
			email: user.email,
			role: role, // Return the role
		};

		return userData;
	} catch (error) {
		console.error("Error signing up user:", error);
		throw error;
	}
};

export const logoutWithFireBase = () => {
	return signOut(auth);
};
