"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Notifications } from "@mantine/notifications";
const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Notifications position="top-right" />
				{children}
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</Provider>
	);
}
