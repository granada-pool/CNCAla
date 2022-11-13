/** @type {import('next').NextConfig} */
const { patchWebpackConfig } = require('next-global-css')

const nextConfig = {
	reactStrictMode: true,
	webpack: (config, options) => {
		patchWebpackConfig(config, options)
	
		if (options.isServer) {
		  config.externals = webpackNodeExternals({
			// Uses list to add this modules for server bundle and process.
			allowlist: [/design-system/],
		  })
		}
	
		return config
	},
	swcMinify: true,
	/**
	 * Note that this can change/break without warning.
	 * @see https://github.com/vercel/next.js/pull/22867
	 */
	experimental: {
		externalDir: true,
		appDir: true
	}
};

module.exports = nextConfig;
