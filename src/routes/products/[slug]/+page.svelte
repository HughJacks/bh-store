<script lang="ts">
    import { goto } from '$app/navigation';

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
    <div class="w-full grid grid-cols-2 gap-4 mb-4 max-w-6xl mx-auto">
        <h1>Trough</h1>
        <div class="w-full">
            <img src={images[4].src} alt={images[5].alt} class="w-full">
        </div>
    </div>
    <div class="w-full columns-4" style="column-fill: balance;">
        {#each images.slice(1) as image}
            <div class="break-inside-avoid">
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