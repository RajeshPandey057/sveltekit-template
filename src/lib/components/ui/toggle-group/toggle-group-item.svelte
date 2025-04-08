<script lang="ts">
	import { type ToggleVariants, toggleVariants } from '$lib/components/ui/toggle/index.js';
	import { cn } from '$lib/utils.js';
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
	import { getToggleGroupCtx } from './toggle-group.svelte';

	let {
		ref = $bindable(null),
		value = $bindable(null),
		class: className,
		size,
		variant,
		...restProps
	}: ToggleGroupPrimitive.ItemProps & ToggleVariants = $props();

	const ctx = getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
	bind:ref
	class={cn(
		toggleVariants({
			variant: ctx.variant || variant,
			// eslint-disable-next-line unicorn/explicit-length-check
			size: ctx.size || size
		}),
		className
	)}
	{value}
	{...restProps} />
