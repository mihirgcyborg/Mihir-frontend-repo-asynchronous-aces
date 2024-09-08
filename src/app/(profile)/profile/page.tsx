"use client";
import React from "react";
import DashboardLayout from "../../(dashboard)/dashboard/layout";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { ProfileContent } from "@/components/profile/ProfileContent";
import withAuth from "@/components/Hoc/withAuth";

const page = () => {
	return (
		<PageContainer title="profile">
			<DashboardLayout>
				<ProfileContent />
			</DashboardLayout>
		</PageContainer>
	);
};

export default withAuth(page);
