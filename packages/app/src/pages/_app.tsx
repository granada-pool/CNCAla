import type { AppProps } from "next/app";
import Head from "next/head";
import { Providers } from "../components/shell";

import "../styles/full.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>CNCAla Donations</title>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
				<meta charSet="utf-8" />
			</Head>
			<Providers>
				<Component {...pageProps} />
				<script
					type="text/javascript"
					src="https://d22knjn4n6hjqd.cloudfront.net/thermometer/embed.js"
				></script>
			</Providers>
		</>
	);
}
