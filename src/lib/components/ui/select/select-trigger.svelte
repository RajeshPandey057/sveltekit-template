<script lang="ts">
	import { cn } from '$lib/utils.js';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	class={cn(
		'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs ring-offset-background focus:ring-1 focus:ring-ring focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted-foreground [&>span]:line-clamp-1',
		className
	)}
	{...restProps}>
	{@render children?.()}
	<ChevronDown class="size-4 opacity-50" />
</SelectPrimitive.Trigger>
