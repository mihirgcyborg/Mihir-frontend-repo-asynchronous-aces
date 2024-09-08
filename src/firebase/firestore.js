import { db } from "./firebaseConfig";
import {
	collection,
	addDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";

const jobsCollection = collection(db, "jobs");

export const addJob = async (job) => {
	await addDoc(jobsCollection, job);
};

export const getJobs = async () => {
	const snapshot = await getDocs(jobsCollection);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateJob = async (id, updatedJob) => {
	const jobDoc = doc(db, "jobs", id);
	return updateDoc(jobDoc, updatedJob);
};

export const deleteJob = async (id) => {
	const jobDoc = doc(db, "jobs", id);

	return deleteDoc(jobDoc);
};
