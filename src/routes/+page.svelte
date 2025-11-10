<script lang="ts">
    import { goto } from '$app/navigation';
	type GalleryImageProps = {
		src: string;
		alt: string;
	};

	const images: GalleryImageProps[] = [
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

	let currentIndex = $state(0);

	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function goToImage(index: number) {
		currentIndex = index;
	}
</script>

<div class="w-full grid grid-cols-11 gap-8 pb-8">
    <div class="col-span-1 text-right text-sm italic">

	<h1 class=" pb-4" >Trough</h1>
</div>
<div class="col-span-2">
    <p class="font-sans " >A shelf designed to hold and display large format design books.</p>
</div>

<div class="col-span-4 columns-2 gap-8">
    <p class="font-sans " >Two pieces of birch join via hardware at a 90 degree angle and intersect with two planes of stainless steel in a friction fit, creating a low to the ground, sturdy, and beautiful display shelf. The current lead time is 4-6 weeks</p>
</div>

<div class="col-span-2">
    <p class="font-sans " >60" x 18" x 18"</p>
    <p class="font-sans " >12.2lbs</p>
</div>

<div class="col-span-2">
    <button class="font-sans underline hover:no-underline cursor-pointer">Add to Cart</button>

    <p class="font-sans " >$500.00</p>
</div>

<div class="col-span-1 text-right flex flex-col gap-1">
    {#each images as _, index}
        <div class="cursor-pointer" on:click={() => goToImage(index)}>{index === currentIndex ? 'x' : '0'}</div>
    {/each}
</div>
<div class="col-span-8 cursor-e-resize h-144  overflow-hidden" on:click={nextImage}>
    <img src={images[currentIndex].src} alt={images[currentIndex].alt} class="w-full h-full object-cover rounded-sm" />
</div>

</div>

{#snippet GalleryImage(image: GalleryImageProps)}
	<img src={image.src} alt={image.alt} class="h-full w-auto flex-none " />
{/snippet}