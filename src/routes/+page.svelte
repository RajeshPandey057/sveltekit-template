<script lang="ts">
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form';
	import Input from '@/components/ui/input/input.svelte';
	import { loginSchema, resetSchema, type LoginSchema, type ResetSchema } from '@/utils';
	import { toast } from 'svelte-sonner';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';
	import FluentMdl2Signin from '~icons/fluent-mdl2/signin';
	import FluentKeyReset20Filled from '~icons/fluent/key-reset-20-filled';
	import FluentSettings24Regular from '~icons/fluent/settings-24-regular';
	import FluentShield24Regular from '~icons/fluent/shield-24-regular';
	import SvgLoader from '~icons/svg-spinners/gooey-balls-2';

	let {
		data
	}: {
		data: {
			loginForm: SuperValidated<Infer<LoginSchema>>;
			resetForm: SuperValidated<Infer<ResetSchema>>;
		};
	} = $props();

	let error: string = $derived(page.url.searchParams.get('message') ?? '');
	// Client API:
	let isReset = $state(false);
	const form = superForm(data.loginForm, {
		validators: zodClient(loginSchema)
	});
	const { form: formData, enhance, delayed, message, capture, restore } = form;
	const resetForm = superForm(data.resetForm, {
		validators: zodClient(resetSchema)
	});
	const {
		form: resetFormData,
		enhance: resetEnhance,
		message: resetMessage,
		delayed: resetDelayed
	} = resetForm;

	function toggleReset() {
		isReset = !isReset;
	}
	$effect(() => {
		if ($message?.text) {
			toast.info($message?.text);
		}
		if ($resetMessage?.text) {
			toast.info($resetMessage?.text);
		}
		if (error) {
			toast.error(error);
		}
	});

	export const snapshot = { capture, restore };
</script>

<div class="flex w-full flex-col lg:flex-row">
	<div
		class="hidden w-full bg-gradient-to-br from-blue-900 to-blue-950 lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-8">
		<enhanced:img
			src="$lib/assets/qualified.webp"
			alt="Provider Portal Background"
			class="h-full w-full object-contain opacity-60">
		</enhanced:img>
		<div class="max-w-md text-center">
			<h1 class="mb-4 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
				<span class="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
					Provider Portal
				</span>
			</h1>
			<p class="text-lg text-blue-100 opacity-90">
				Secure access to manage your services and connect with your patients
			</p>
			<div class="mt-6">
				<div class="inline-block h-1 w-24 rounded bg-blue-400"></div>
			</div>

			<div class="mt-8 grid grid-cols-2 gap-4 text-sm text-blue-200">
				<div class="flex flex-col items-center rounded-lg bg-blue-950/50 p-4">
					<FluentShield24Regular class="mb-2 h-8 w-8" />
					<span>Secure Access</span>
				</div>
				<div class="flex flex-col items-center rounded-lg bg-blue-950/50 p-4">
					<FluentSettings24Regular class="mb-2 h-8 w-8" />
					<span>Manage Services</span>
				</div>
			</div>
		</div>
	</div>
	<div class="flex min-h-[70vh] w-full items-center justify-center p-4 lg:min-h-screen lg:p-0">
		<div class="flex h-full w-full items-center justify-center px-4">
			<Card.Root class="max-w-sm mx-auto">
				<Card.Header>
					<Card.Title class="text-2xl">{isReset ? 'Forgot Password' : 'Signin'}</Card.Title>
					<Card.Description>
						Enter your email below to {isReset
							? 'receive password reset link'
							: 'login to your account'}
					</Card.Description>
				</Card.Header>
				<Card.Content>
					{#if isReset}
						<form method="POST" action="?/reset" use:resetEnhance class="grid gap-4">
							<Form.Field {form} name="email">
								<Form.Control>
									{#snippet children({ props })}
										<div class="flex items-center">
											<Form.Label>Email</Form.Label>
											<a href="##" class="ml-auto text-sm underline" onclick={toggleReset}>
												Sign In ?
											</a>
										</div>
										<Input
											{...props}
											type="email"
											inputmode="email"
											autocomplete="email"
											placeholder="m@example.com"
											bind:value={$resetFormData.email} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors class="text-xs sm:text-sm" />
							</Form.Field>

							<Form.Button
								class="h-10 w-full bg-blue-600 text-sm sm:text-base"
								disabled={$resetDelayed}>
								<span>
									{#if $resetDelayed}<SvgLoader />{:else}<FluentKeyReset20Filled />{/if}
								</span>
								<span>Send Reset link</span>
							</Form.Button>
						</form>
					{:else}
						<form method="POST" action="?/login" use:enhance class="grid gap-4">
							<Form.Field {form} name="email">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>Email</Form.Label>
										<Input
											{...props}
											type="email"
											inputmode="email"
											autocomplete="email"
											bind:value={$formData.email}
											placeholder="m@example.com" />
									{/snippet}
								</Form.Control>

								<Form.FieldErrors class="text-xs sm:text-sm" />
							</Form.Field>
							<Form.Field {form} name="password">
								<Form.Control>
									{#snippet children({ props })}
										<div class="flex items-center">
											<Form.Label>Password</Form.Label>
											<a href="##" class="ml-auto text-sm underline" onclick={toggleReset}>
												Forgot your password?
											</a>
										</div>
										<Input
											{...props}
											type="password"
											placeholder="Enter Your Password"
											bind:value={$formData.password} />
									{/snippet}
								</Form.Control>

								<Form.FieldErrors class="text-xs sm:text-sm" />
							</Form.Field>
							<Form.Button class="h-10 w-full bg-blue-600 text-sm sm:text-base" disabled={$delayed}>
								<span>
									{#if $delayed}<SvgLoader />{:else}<FluentMdl2Signin />{/if}
								</span>
								<span>Sign in</span>
							</Form.Button>
						</form>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
