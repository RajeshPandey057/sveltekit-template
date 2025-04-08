import { DashboardUser } from '$lib/server/db/schema';
import type { DecodedIdToken } from 'firebase-admin/auth';
import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	type APIResponse<T = object> = { success: false; error: string } | { success: true; data: T };

	namespace App {
		// interface Error {}
		interface Locals {
			user: DecodedIdToken | undefined;
			dashboardUser: DashboardUser | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		namespace Superforms {
			type Message = { status: 'error' | 'success' | 'warning'; text: string };
		}
	}
}

export {};
