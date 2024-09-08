"use client";
import { LoginForm } from "@/components/Auth/LoginForm";
import withAuth from "@/components/Hoc/withAuth";

function Login() {
	return <LoginForm />;
}
export default withAuth(Login);
