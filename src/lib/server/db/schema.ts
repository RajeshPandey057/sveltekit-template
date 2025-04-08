import { integer, pgTable, serial } from 'drizzle-orm/pg-core';

export const dashboardUser = pgTable('user', {
	id: serial('id').primaryKey(),
	age: integer('age')
});
export type DashboardUser = typeof dashboardUser;
