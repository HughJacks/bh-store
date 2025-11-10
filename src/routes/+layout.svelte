<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="p-2  min-h-screen">
	<div class="flex flex-col gap-4">
		<div class="h-36 flex items-start justify-between w-full max-w-6xl mx-auto">
			<h1 class="underline cursor-pointer hover:no-underline" onclick={() => goto('/')}>Techtonic</h1>
			<h1 class="underline cursor-pointer hover:no-underline">Cart (0)</h1>
		</div>
	</div>
		<div class="w-full ">
			{@render children()}
		</div>
	
</div>

<div class="p-2 max-w-6xl mx-auto">
<div class="">© Techtonic llc</div>
</div>