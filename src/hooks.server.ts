import { SESSION_TOKEN } from '$lib/constants';
import { verifySessionCookie } from '@/server/firebase';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const { cookies, locals } = event;
	locals.user = undefined; // default if session cookie fails
	// decode the cookie and get the session property
	const session = cookies.get(SESSION_TOKEN);

	if (session) {
		// if session cookie is set, verify it is valid and set the user from it
		try {
			const decodedToken = await verifySessionCookie(session);
			if (decodedToken) {
				locals.user = decodedToken;
				// if (!locals.admin && !event.url.searchParams.has('message')) {
				// 	locals.admin = await db.query.admin.findFirst({
				// 		where: ({ uid }, { eq }) => eq(uid, locals.user.uid)
				// 	});
				// }
			}
		} catch (error) {
			locals.user = undefined;
			// locals.admin = undefined;
			console.log(error);

			throw redirect(303, `/?message=There was an error please try again`);
		}
	} else {
		// locals.admin = null;
		cookies.delete(SESSION_TOKEN, { path: '/' });
	}
	if (!locals.user && event.route.id?.startsWith('/(secured)')) {
		// locals.admin = null;
		throw redirect(
			303,
			`/?redirectTo=${
				event.url.pathname + event.url.search
			}&message=You must be logged in to access this page`
		);
	} else if (locals.user && /* locals.admin && */ event.url.pathname === '/') {
		throw redirect(303, '/dashboard');
	}

	return resolve(event);
}
