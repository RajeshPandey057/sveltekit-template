import {
	FIREBASE_BUCKET,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_PROJECT_ID
} from '$env/static/private';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth, type SessionCookieOptions } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Memoize the Firebase app instance
export const firebaseApp =
	getApps().find((it) => it.name === 'firebase-admin-app') ??
	initializeApp(
		{
			credential: cert({
				projectId: FIREBASE_PROJECT_ID,
				clientEmail: FIREBASE_CLIENT_EMAIL,
				// Handle private key replacement safely
				privateKey: FIREBASE_PRIVATE_KEY.replaceAll(String.raw`\n`, '\n')
			}),
			storageBucket: FIREBASE_BUCKET
		},
		'firebase-admin-app'
	);

// Memoize service instances
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export async function createSessionCookie(
	idToken: string,
	sessionCookieOptions: SessionCookieOptions
) {
	if (!idToken) return;

	try {
		return await auth.createSessionCookie(idToken, sessionCookieOptions);
	} catch (error) {
		console.error('Session cookie creation failed:', error);
		return;
	}
}

export async function revokeAllSessions(session: string) {
	if (!session) return false;
	try {
		const decodedIdToken = await auth.verifySessionCookie(session, true); // Added checkRevoked flag
		await auth.revokeRefreshTokens(decodedIdToken.sub);
		return true;
	} catch (error) {
		console.error('Revoking sessions failed:', error);
		return false;
	}
}

export async function validateToken(token: string) {
	if (!token) return;
	try {
		return await auth.verifyIdToken(token, true); // Added checkRevoked flag
	} catch (error) {
		console.error('Token validation failed:', error);
		return;
	}
}

export async function verifySessionCookie(token: string) {
	if (!token) return;
	try {
		return await auth.verifySessionCookie(token, true); // Added checkRevoked flag
	} catch (error) {
		console.error('Session cookie verification failed:', error);
		return;
	}
}
