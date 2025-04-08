import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});
export const resetSchema = z.object({
	email: z.string().email()
});

export const searchSchema = z.object({
	query: z.string().min(1, { message: 'Search query cannot be empty.' })
});
export type ResetSchema = typeof resetSchema;
export type LoginSchema = typeof loginSchema;
export type SearchSchema = typeof searchSchema;
