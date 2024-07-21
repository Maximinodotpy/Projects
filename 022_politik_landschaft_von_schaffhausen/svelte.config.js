import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	

	kit: {
		paths: {
			base: '/d/politik_landschaft_von_schaffhausen',
		},

		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
		})
	}
};

export default config;
