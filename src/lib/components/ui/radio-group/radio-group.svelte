<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(null),
		...restProps
	}: RadioGroupPrimitive.RootProps = $props();
</script>

<RadioGroupPrimitive.Root bind:value class={cn('grid gap-2', className)} {...restProps} bind:ref />
