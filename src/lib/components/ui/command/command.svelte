<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Command as CommandPrimitive } from 'bits-ui';

	let {
		value = $bindable(''),
		ref = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.RootProps = $props();
</script>

<CommandPrimitive.Root
	class={cn(
		'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
		className
	)}
	bind:ref
	bind:value
	{...restProps} />
