import { defineConfig } from 'drizzle-kit';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd());

export default defineConfig({
	strict: true,
	verbose: true,
	out: './.drizzle',
	casing: 'snake_case',
	dialect: 'postgresql',
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: {
		url: env.VITE_LOCAL_DB // env.VITE_CLOUD_DB//env.VITE_PROD_DB
	}
});
