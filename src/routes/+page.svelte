<script lang="ts">
    import { goto } from '$app/navigation';
	import { cartStore } from '$lib/stores/cart.svelte';
	import type { PageData } from './$types';
	
	type GalleryImageProps = {
		src: string;
		alt: string;
	};

	let { data } = $props<{ data: PageData }>();
	
	// Fallback to local images if no product images from Shopify
	const localImages: GalleryImageProps[] = [
        { src: '/3.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/2.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/4.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/7.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/8.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/9.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/10.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/11.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/12.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/13.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/14.jpg', alt: 'Artisan goods arranged on shelves' },
	];

	// Use Shopify images if available, otherwise fallback to local
	const images = $derived.by(() => {
		if (data.product?.images?.edges && data.product.images.edges.length > 0) {
			return data.product.images.edges.map((edge: { node: { url: string; altText: string | null } }) => ({
				src: edge.node.url,
				alt: edge.node.altText || data.product!.title
			}));
		}
		return localImages;
	});

	const price = $derived.by(() => {
		if (data.product?.priceRange?.minVariantPrice) {
			const amount = parseFloat(data.product.priceRange.minVariantPrice.amount);
			const currency = data.product.priceRange.minVariantPrice.currencyCode;
			return `$${amount.toFixed(2)}`;
		}
		return '$500.00';
	});

	const variantId = $derived(data.product?.variants?.edges[0]?.node.id);
	const quantityAvailable = $derived(data.product?.variants?.edges[0]?.node.quantityAvailable ?? 0);
	const isOutOfStock = $derived(quantityAvailable === 0);

	let currentIndex = $state(0);
	let isAddingToCart = $state(false);
	let loadedImages = $state<Set<string>>(new Set());

	// Preload all images when component mounts
	$effect(() => {
		images.forEach((image: GalleryImageProps) => {
			const img = new Image();
			img.onload = () => {
				loadedImages = new Set([...loadedImages, image.src]);
			};
			img.src = image.src;
		});
	});

	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function goToImage(index: number) {
		currentIndex = index;
	}

	const isCurrentImageLoaded = $derived(loadedImages.has(images[currentIndex].src));

	async function handleAddToCart() {
		if (!variantId) {
			console.error('No variant ID available');
			return;
		}

		try {
			isAddingToCart = true;
			await cartStore.addToCart(variantId, 1);
		} catch (error) {
			console.error('Failed to add to cart:', error);
		} finally {
			isAddingToCart = false;
		}
	}
</script>

<div class="w-full grid grid-cols-7 md:grid-cols-11 gap-4 md:gap-8 pb-8">
    <div class="col-span-1 text-right text-sm italic">

	<h1 class=" pb-4" >Trough</h1>
</div>
<div class="col-span-3 md:col-span-2">
    <p class="font-sans " >A shelf designed to hold and display large format design books.</p>
</div>

<div class="col-span-4 columns-2 gap-8 hidden md:block">
    <p class="font-sans " >Two pieces of birch join via hardware at a 90 degree angle and intersect with two planes of stainless steel in a friction fit, creating a low to the ground, sturdy, and beautiful display shelf. The current lead time is 4-6 weeks</p>
</div>

<div class="col-span-2 hidden md:block">
    <p class="font-sans " >60" x 18" x 18"</p>
    <p class="font-sans " >12.2lbs</p>
</div>

<div class="col-span-3 md:col-span-2 text-left">
    <button 
		class="font-sans underline hover:no-underline cursor-pointer  disabled:no-underline disabled:cursor-not-allowed text-left"
		onclick={handleAddToCart}
		disabled={isAddingToCart || !variantId || isOutOfStock}
	>
		{isOutOfStock ? 'Out of Stock' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
	</button>

	{#if !isOutOfStock}
    <p class="font-sans">{price}</p>
	{/if}
</div>

<div class="col-span-1 text-right flex flex-col gap-1">
    {#each images as _, index}
        <div class="cursor-pointer" onclick={() => goToImage(index)}>{index === currentIndex ? 'x' : '0'}</div>
    {/each}
</div>
<div class="col-span-6 md:col-span-8 cursor-e-resize h-72 md:h-144 overflow-hidden rounded-sm" onclick={nextImage}>
    {#if isCurrentImageLoaded}
        <img src={images[currentIndex].src} alt={images[currentIndex].alt} class="w-full h-full object-cover aspect-square md:aspect-auto" />
    {:else}
        <div class="w-full h-full bg-gray-200 rounded-sm"></div>
    {/if}
</div>

</div>

{#snippet GalleryImage(image: GalleryImageProps)}
	<img src={image.src} alt={image.alt} class="h-full w-auto flex-none " />
{/snippet}