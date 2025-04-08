<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import { Pagination as PaginationPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PaginationPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<span>Previous</span>
	<ChevronLeft />
{/snippet}

<PaginationPrimitive.PrevButton
	bind:ref
	{...restProps}
	class={cn(buttonVariants({ variant: 'ghost', className: 'gap-1 pl-2.5' }), className)}
	children={children || Fallback} />
