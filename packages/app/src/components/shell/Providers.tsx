import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { MeshProvider } from "@meshsdk/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "../../config";
import { theme } from "../../theme";
import AppProvider from "./AppProvider";

/**
 * Component that sets up all required providers.
 */
export function Providers({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<MeshProvider>
					<AppProvider>{children}</AppProvider>
				</MeshProvider>
			</ChakraProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
