import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		})
	]
});
