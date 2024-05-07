import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
					<Script
						src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
						strategy="beforeInteractive"
					></Script>
				</body>
			</Html>
		);
	}
}
