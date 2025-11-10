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

<div class=" text-xs min-h-screen w-full max-w-7xl mx-auto  flex flex-col gap-4 p-5 tracking-tightest leading-tight ">
		<div class="h-72 grid grid-cols-11 flex-row gap-8">
			<h1 class="text-sm italic col-span-1 text-right " onclick={() => goto('/')}>Tectonic</h1>
			<div class="col-span-6 "></div>
			<p class="font-sans  tracking-tightest leading-tight col-span-2 ">A small studio, based in Detroit, whose work focuses on creating unique and functional products.</p>

			<h1 
				class="underline cursor-pointer hover:no-underline font-sans col-span-2"
				onclick={() => cartOpen = !cartOpen}
			>
				Cart ({cartStore.itemCount})
			</h1>
		</div>
		<div class="w-full ">
			{@render children()}
		</div>

	<!-- Cart Drawer -->
	{#if cartOpen}
		<div class="fixed inset-0 bg-black/30 z-40" onclick={() => cartOpen = false}></div>
		<div class="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 p-8 overflow-y-auto shadow-2xl">
				<div class="flex justify-between items-start mb-8">
					<h2 class="text-sm italic">Cart ({cartStore.itemCount})</h2>
					<button 
						class="font-sans underline hover:no-underline"
						onclick={() => cartOpen = false}
					>
						Close
					</button>
				</div>

				{#if cartStore.cart && cartStore.cart.lines.edges.length > 0}
					<div class="space-y-6 mb-8">
						{#each cartStore.cart.lines.edges as { node: line }}
							<div class="font-sans text-xs">
								<div class="grid grid-cols-4 gap-4">
									<div class="col-span-2">
										<p class="font-semibold">{line.merchandise.product.title}</p>
										<p class="text-gray-600">{line.merchandise.title !== 'Default Title' ? line.merchandise.title : ''}</p>
									</div>
									<div class="text-center">
										<p>Qty: {line.quantity}</p>
									</div>
									<div class="text-right">
										<p>${(parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2)}</p>
									</div>
								</div>
								<button
									class="mt-2 text-xs underline hover:no-underline text-gray-600"
									onclick={() => cartStore.removeFromCart(line.id)}
								>
									Remove
								</button>
							</div>
						{/each}
					</div>

					<div class="border-t pt-6 mb-8">
						<div class="flex justify-between font-sans text-xs mb-2">
							<span>Subtotal</span>
							<span>${parseFloat(cartStore.cart.cost.subtotalAmount.amount).toFixed(2)}</span>
						</div>
						<div class="flex justify-between font-sans text-sm font-semibold">
							<span>Total</span>
							<span>${parseFloat(cartStore.cart.cost.totalAmount.amount).toFixed(2)}</span>
						</div>
					</div>

					<button 
						class="w-full bg-black text-white py-3 font-sans text-sm hover:bg-gray-800 transition-colors"
						onclick={() => cartStore.openCheckout()}
					>
						Checkout
					</button>
				{:else}
					<p class="font-sans text-sm text-gray-600">Your cart is empty</p>
				{/if}
			</div>
		{/if}



		<div class="h-72 grid grid-cols-11 flex-row gap-8">
			<h1 class="text-sm italic col-span-1 text-right " onclick={() => goto('/')}>Information</h1>
			<div class="col-span-2 font-sans  tracking-tightest leading-tight ">
				<p class="">hello@tectonic.org</p>
				<p class="">+555-555-5555</p>
				<p class="mb-4">123 Main St, Detroit, MI 48201</p>
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

