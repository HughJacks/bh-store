<script lang="ts">
    import { goto } from '$app/navigation';
    import TroughModel from '$lib/3d/TroughModel.svelte';

    const images = [
        { src: '/1.jpg', alt: 'Trough' },
        { src: '/2.jpg', alt: 'Trough' },
        { src: '/3.jpg', alt: 'Trough' },
        { src: '/4.jpg', alt: 'Trough' },
        { src: '/5.jpg', alt: 'Trough' },
        { src: '/6.jpg', alt: 'Trough' },
        { src: '/7.jpg', alt: 'Trough' },
        { src: '/8.jpg', alt: 'Trough' },
        { src: '/9.jpg', alt: 'Trough' },
        { src: '/10.jpg', alt: 'Trough' },
        { src: '/11.jpg', alt: 'Trough' },
        { src: '/12.jpg', alt: 'Trough' },
        { src: '/13.jpg', alt: 'Trough' },
        { src: '/14.jpg', alt: 'Trough' }
      
    ];
</script>

<div class="w-full">
    <div class="w-full grid grid-cols-3 gap-4 mb-4 max-w-6xl mx-auto h-144 ">
        <div class="col-span-1 ">
            <div class="flex flex-row justify-between items-baseline mb-4">
            <h1 class="font-bold underline">Trough</h1>
            <h1 class="font-bold">$400.00</h1>
            <button class="underline cursor-pointer hover:no-underline font-bold">Add to Cart</button>
            </div>
            <p class="mb-4">The Trough is a simple, yet elegant piece of furniture that is perfect for any space. It is made of solid oak and has a natural finish. It is perfect for displaying your favorite items or for use as a side table.</p>
<ul class="list-disc list-inside mb-4">
    <li><span class="underline">Wood</span> - Birch</li>
    <li><span class="underline">Metal</span> - unfinished Stainless Steel</li>
    <li><span class="underline">Hardware</span> - blah blah blah</li>
    <li><span class="underline">Dimensions</span> - 60" x 18" x 18"</li>

</ul>
        </div>
        <div class="col-span-2  h-full overflow-hidden">
        <!-- <TroughModel /> -->
         <img src={images[4].src} alt="Trough" class="w-full h-full object-cover " />
        </div>
    </div>
    <div class="max-w-6xl mx-auto columns-2" style="column-fill: balance;">
        {#each images.slice(1) as image}
            <div class="break-inside-avoid mb-4">
                <img 
                    src={image.src} 
                    alt={image.alt} 
                    class="w-full h-auto block" 
                    loading="lazy"
                >
            </div>
        {/each}
    </div>
</div>