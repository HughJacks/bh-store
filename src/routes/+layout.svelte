<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Page from './+page.svelte';
	import { cartStore } from '$lib/stores/cart.svelte';

	let { children } = $props();
	
	let cartOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class=" text-xs min-h-screen w-full max-w-7xl mx-auto  flex flex-col gap-4 p-2 md:p-5 tracking-tightest leading-tight ">
		<div class="h-72 grid grid-cols-7 md:grid-cols-11 flex-row gap-4 md:gap-8">
			<h1 class="text-sm italic col-span-1 text-right " onclick={() => goto('/')}>Tectonic</h1>
			<div class="hidden md:block md:col-span-6 "></div>
			<p class="font-sans tracking-tightest leading-tight col-span-3 md:col-span-2 ">A small studio, based in Detroit, whose work focuses on creating unique and functional products.</p>

			<h1 
				class="underline cursor-pointer hover:no-underline font-sans col-span-2"
				onclick={() => cartOpen = !cartOpen}
			>
				Cart ({cartStore.itemCount})
			</h1>
		</div>
		{#if cartOpen}
		<!-- Cart View -->
		<div class="w-full max-w-7xl min-h-[calc(100vh-20rem)]">
			{#if cartStore.cart && cartStore.cart.lines.edges.length > 0}
				{#each cartStore.cart.lines.edges as { node: line }}
					<div class="grid grid-cols-7 md:grid-cols-11 gap-4 md:gap-8 pb-8">
						<div class="col-span-1 text-right italic text-sm ">
							<span>
								<button 
									class="cursor-pointer hover:opacity-50 inline mr-1 underline hover:no-underline"
									onclick={() => cartStore.removeFromCart(line.id)}
								>
									X
								</button>
								<span class="inline">{line.merchandise.product.title}</span>
							</span>
							{#if line.merchandise.title !== 'Default Title'}
								<p class="">{line.merchandise.title}</p>
							{/if}
						</div>
						<div class="hidden md:block md:col-span-3"></div>
												
						<div class="col-span-3">
							<p class="font-sans">Quantity: {line.quantity}</p>
							{#if line.merchandise.product.images?.edges?.[0]?.node.url}
								<img 
									src={line.merchandise.product.images.edges[0].node.url} 
									alt={line.merchandise.product.title}
									class="w-full h-auto object-cover mt-2 rounded-sm"
								/>
							{/if}
						</div>
						
						<div class="col-span-3">
							<p class="font-sans">${(parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2)}</p>
						</div>

						<div class="hidden md:block md:col-span-2">
							{#if line.merchandise.product.images?.edges?.[0]?.node.url}
								<img 
									src={line.merchandise.product.images.edges[0].node.url} 
									alt={line.merchandise.product.title}
									class="w-full h-auto object-cover"
								/>
							{/if}
						</div>
					</div>
				{/each}
				
				<div class="grid grid-cols-5 md:grid-cols-11 gap-4 md:gap-8 pb-8 border-t pt-8">
					<div class="col-span-1"></div>
					<div class="hidden md:block md:col-span-6"></div>
					<div class="col-span-2">
						<p class="font-sans">Subtotal</p>
						<p class="font-sans font-semibold">Total</p>
					</div>
					<div class="col-span-2">
						<p class="font-sans">${parseFloat(cartStore.cart.cost.subtotalAmount.amount).toFixed(2)}</p>
						<p class="font-sans font-semibold">${parseFloat(cartStore.cart.cost.totalAmount.amount).toFixed(2)}</p>
					</div>
				</div>
				
				<div class="grid grid-cols-5 md:grid-cols-11 gap-4 md:gap-8 pb-8">
					<div class="col-span-1"></div>
					<div class="col-span-2 md:col-span-8"></div>
					<div class="col-span-2">
						<button 
							class="font-sans underline hover:no-underline cursor-pointer"
							onclick={() => cartStore.openCheckout()}
						>
							Checkout
						</button>
					</div>
				</div>
			{:else}
				<div class="grid grid-cols-5 md:grid-cols-11 gap-4 md:gap-8 pb-8">
					<div class="col-span-1"></div>
					<div class="col-span-2">
						<p class="font-sans">Your cart is empty</p>
					</div>
				</div>
			{/if}
		</div>
		{:else}
			<div class="w-full ">
				{@render children()}
			</div>
		{/if}



		<div class="h-72 grid grid-cols-7 md:grid-cols-11 flex-row gap-4 md:gap-8">
			<h1 class="text-sm italic  md:col-span-1 text-right " onclick={() => goto('/')}>Info</h1>

			<div class="col-span-3 md:col-span-2 font-sans  tracking-tightest leading-tight ">
				<p class="">hello@tectonic.org</p>
				<p class="">+555-555-5555</p>
				<p class="mb-4">123 Main St, Detroit, MI 48201</p>
<p class="font-sans tracking-tightest leading-tight" >Tectonic is the collaborative effort of two designers, Ben Michalsky & Hugh Jacks. They met at the University of Michigan and have been working together since 2025.</p>


			</div>
			<div class="hidden md:block md:col-span-2 tracking-tightest leading-tight">
				<p class="font-sans mb-4" >Tectonic offers both retail products and studio services</p>
				<p class="font-sans " >Collaborators: Nihal Patel, Sam Stein, Ryan Krieger, Andrew Weingarten, Ben Michalsky, Hugh Jacks, Jacob Rader, </p>

			</div>
			<div class="col-span-2 hidden md:block "></div>
			<p class="font-sans  tracking-tightest leading-tight col-span-3 md:col-span-2 hidden md:block ">A small studio, based in Detroit, whose work focuses on creating unique and functional products.</p>

			<h1 class="font-sans col-span-2">Tectonic llc copyright 2025</h1>
		</div>
</div>

