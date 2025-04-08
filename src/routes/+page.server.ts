import { FIREBASE_KEY } from '$env/static/private';
import { options, SESSION_TOKEN, WEEK_IN_MILLISECONDS } from '@/constants';
import { createSessionCookie } from '@/server/firebase';
import { loginSchema, resetSchema } from '@/utils';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate, type Infer } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export async function load(event) {
	return {
		loginForm: await superValidate<Infer<typeof loginSchema>, App.Superforms.Message>(
			event,
			zod(loginSchema)
		),
		resetForm: await superValidate<Infer<typeof resetSchema>, App.Superforms.Message>(
			event,
			zod(resetSchema)
		)
	};
}

export const actions: Actions = {
	login: async ({ request, cookies, url }) => {
		const form = await superValidate<Infer<typeof loginSchema>, App.Superforms.Message>(
			request,
			zod(loginSchema)
		);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { email, password } = form.data;
		const signIn = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
			{
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ email, password, returnSecureToken: true })
			}
		);
		if (!signIn.ok) {
			const signInData = await signIn.json();
			return message(
				form,
				{ status: 'error', text: signInData.error.message },
				{
					status: 403
				}
			);
		}
		let sessionCookie;
		try {
			const { idToken } = await signIn.json();
			sessionCookie = await createSessionCookie(idToken, {
				expiresIn: WEEK_IN_MILLISECONDS
			});
		} catch (error) {
			console.error(error);
			return message(
				form,
				{ status: 'error', text: 'An unknown error occurred' },
				{
					status: 500
				}
			);
		}
		if (sessionCookie) {
			cookies.set(SESSION_TOKEN, sessionCookie, options);
			const redirectTo = url.searchParams.get('redirectTo');
			if (redirectTo) {
				throw redirect(302, `/${redirectTo.slice(1)}`);
			}
			throw redirect(302, '/dashboard');
		} else cookies.delete(SESSION_TOKEN, { path: '/' });
		return { form };
	},
	reset: async ({ request }) => {
		const form = await superValidate<Infer<typeof resetSchema>, App.Superforms.Message>(
			request,
			zod(resetSchema)
		);
		if (!form.valid) {
			return fail(400, { form });
		}
		const resetRes = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_KEY}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ requestType: 'PASSWORD_RESET', email: form.data.email })
			}
		);

		if (!resetRes.ok) {
			const resetData = await resetRes.json();
			return message(form, { status: 'error', text: resetData.error.message }, { status: 400 });
		}
		return message(
			form,
			{ status: 'success', text: 'Email sent with password reset link' },
			{
				status: 500
			}
		);
	},
	logout: async ({ cookies }) => {
		cookies.delete(SESSION_TOKEN, { path: '/' });
		return { success: true };
	}
};
