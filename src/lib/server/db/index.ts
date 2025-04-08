import { dev } from '$app/environment';
// import { CLOUD_DB, CLOUD_DU, CLOUD_HOST, CLOUD_PW } from '$env/static/private';
import { DB_HOST, DB_NAME, DB_PW, DB_USER } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const db = drizzle(
	postgres({
		// host: `${CLOUD_HOST}`,
		// user: `${CLOUD_DU}`,
		// database: `${CLOUD_DB}`,
		// password: `${CLOUD_PW}`
		host: `${DB_HOST}`,
		user: `${DB_USER}`,
		password: `${DB_PW}`,
		database: `${DB_NAME}`
	}),
	{ schema, casing: 'snake_case', logger: dev }
);
