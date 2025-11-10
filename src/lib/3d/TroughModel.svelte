<script lang="ts">
    import { Canvas, T } from '@threlte/core';
    import Trough from './Trough.svelte';
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    
    // Define camera positions
    const cameraPositions: [number, number, number][] = [
        [100, 50, 100],
        [150, 0, 0],
        [-150, 0, 0],
        [0, 150, 0],
        [0, 0, 150],
        [100, 100, 0],
    ];
    
    let currentCameraIndex = $state(0);
    let currentPosition = $derived(cameraPositions[currentCameraIndex]);
    let cameraRef = $state<THREE.PerspectiveCamera>();
    
    // Update camera to look at origin whenever position changes
    $effect(() => {
        if (cameraRef && currentPosition) {
            cameraRef.position.set(...currentPosition);
            cameraRef.lookAt(0, 0, 0);
        }
    });
    
    onMount(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                currentCameraIndex = (currentCameraIndex - 1 + cameraPositions.length) % cameraPositions.length;
            } else if (event.key === 'ArrowRight') {
                currentCameraIndex = (currentCameraIndex + 1) % cameraPositions.length;
            }
        };
        
        window.addEventListener('keydown', handleKeydown);
        
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    });
</script>

<div class="w-full ">
    <Canvas 
        dpr={4}
        renderMode="on-demand"
        createRenderer={(canvas) => {
            return new THREE.WebGLRenderer({ 
                canvas, 
                antialias: true,
                alpha: true
            });
        }}
    >
        <T.PerspectiveCamera 
            bind:ref={cameraRef}
            makeDefault 
            position={currentPosition} 
            fov={45}
        />
        <T.AmbientLight intensity={0.5} />
        <T.DirectionalLight position={[10, 10, 5]} intensity={1} />
        
        <Trough />
    </Canvas>
</div>

