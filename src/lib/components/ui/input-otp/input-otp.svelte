<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { PinInput as InputOTPPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(''),
		...restProps
	}: ComponentProps<typeof InputOTPPrimitive.Root> = $props();
</script>

<InputOTPPrimitive.Root
	bind:ref
	bind:value
	class={cn(
		'flex items-center gap-2 has-disabled:opacity-50 disabled:[&_input]:cursor-not-allowed',
		className
	)}
	{...restProps} />
