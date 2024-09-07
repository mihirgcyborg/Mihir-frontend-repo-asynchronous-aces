"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: React.ComponentType) => {
	return (props: any) => {
		const router = useRouter();

		useEffect(() => {
			const token = Cookies.get("userToken");
			if (!token) {
				router.replace("/login");
			}
		}, [router]);

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
