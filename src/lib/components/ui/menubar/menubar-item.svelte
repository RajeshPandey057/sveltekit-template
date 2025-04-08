<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Menubar as MenubarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: MenubarPrimitive.ItemProps & {
		inset?: boolean;
	} = $props();
</script>

<MenubarPrimitive.Item
	bind:ref
	class={cn(
		'relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground',
		inset && 'pl-8',
		className
	)}
	{...restProps} />
