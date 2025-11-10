<script lang="ts">
    import { goto } from '$app/navigation';
	type GalleryImageProps = {
		src: string;
		alt: string;
	};

	const images: GalleryImageProps[] = [
		{ src: '/5.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/3.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/2.jpg', alt: 'Artisan goods arranged on shelves' },
        { src: '/4.jpg', alt: 'Artisan goods arranged on shelves' },



	];
</script>

<div class="w-full max-w-6xl mx-auto flex flex-col gap-4">
<div class="w-full ">
    <div class="flex flex-row justify-between pb-2">
	<h1 class="underline cursor-pointer hover:no-underline" onclick={() => goto('/products/trough')}>Trough</h1>
    <h1 class="">$400.00</h1>
</div>
	<div class="flex flex-row gap-2 h-72 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

		{#each images as image}
			{@render GalleryImage(image)}
		{/each}
	</div>
    

</div>
</div>

{#snippet GalleryImage(image: GalleryImageProps)}
	<img src={image.src} alt={image.alt} class="h-full w-auto flex-none " />
{/snippet}