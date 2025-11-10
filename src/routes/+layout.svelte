<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Page from './+page.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class=" text-xs min-h-screen w-full max-w-7xl mx-auto  flex flex-col gap-4 p-5 tracking-tightest leading-tight ">
		<div class="h-72 grid grid-cols-11 flex-row gap-8">
			<h1 class="text-sm italic col-span-1 text-right " onclick={() => goto('/')}>Tectonic</h1>
			<div class="col-span-6 "></div>
			<p class="font-sans  tracking-tightest leading-tight col-span-2 ">A small studio, based in Detroit, whose work focuses on creating unique and functional products.</p>

			<h1 class="underline cursor-pointer hover:no-underline font-sans col-span-2">Cart (0)</h1>
		</div>
		<div class="w-full ">
			{@render children()}
		</div>

		<div class="h-72 grid grid-cols-11 flex-row gap-8">
			<h1 class="text-sm italic col-span-1 text-right " onclick={() => goto('/')}>Information</h1>
			<div class="col-span-2 font-sans  tracking-tightest leading-tight ">
				<p class="">Contact</p>
				<p class="">hello@tectonic.org</p>
				<p class="">+555-555-5555</p>
				<p class="mb-4">123 Main St, Detroit, MI 48201</p>
<p>About</p>
<p class="font-sans tracking-tightest leading-tight" >Tectonic is the collaborative effort of two designers, Ben Michalsky & Hugh Jacks. They met at the University of Michigan and have been working together since 2025.</p>


			</div>
			<div class="col-span-2 tracking-tightest leading-tight">
				<p class="font-sans mb-4" >Tectonic offers both retail products and studio services</p>
				<p class="font-sans " >Collaborators: Nihal Patel, Sam Stein, Ryan Krieger, Andrew Weingarten, Ben Michalsky, Hugh Jacks, Jacob Rader, </p>

			</div>
			<div class="col-span-2 "></div>
			<p class="font-sans  tracking-tightest leading-tight col-span-2 ">A small studio, based in Detroit, whose work focuses on creating unique and functional products.</p>

			<h1 class="font-sans col-span-2">Tectonic llc copyright 2025</h1>
		</div>


</div>

