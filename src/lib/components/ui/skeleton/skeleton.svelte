<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<div bind:this={ref} class={cn('animate-pulse rounded-md bg-primary/10', className)} {...restProps}>
</div>
