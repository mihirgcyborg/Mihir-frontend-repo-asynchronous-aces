"use client";
import { DashboardContent } from "@/components/Dashboard/DashboardContent";
import withAuth from "@/components/Hoc/withAuth";
import { PageContainer } from "@/components/PageContainer/PageContainer";

function Dashboard() {
	return (
		<PageContainer title="Dashboard">
			<DashboardContent />
		</PageContainer>
	);
}

export default withAuth(Dashboard);
