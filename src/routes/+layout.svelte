<script lang="ts">
	import Sonner from '$lib/components/ui/sonner/sonner.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<main class="font-int flex min-h-dvh">
	{@render children?.()}
</main>
<Sonner richColors />
