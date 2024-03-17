<script lang="ts">
    import { createPersistentStore } from "./stores";
    import { people } from "./people-data";
    import { onMount } from "svelte";

    let isOpen = false;

    const currenPicture = createPersistentStore("currentPicture", 0);

    let picture_el: HTMLImageElement;

    let pictureList: {
        url: string;
        alt: string;
    }[] = [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Trinity_100ton_Test.gif',
            alt: 'Trinity 100ton Test'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/TrinityFireballGif.gif',
            alt: 'Trinity 100ton Test'
        }
    ];

    // Add all the images from the poeple data
    people.forEach((person) => {
        pictureList = pictureList.concat(person.real_pictures ?? []);
    });

    $: {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';

        if ($currenPicture < 0) {
            currenPicture.set(pictureList.length - 1);
        }

        if ($currenPicture >= pictureList.length) {
            currenPicture.set(0);
        }
    }

    // Close lightbox when pressing escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            isOpen = false;
        }

        if (e.key === 'ArrowRight') {
            currenPicture.update((n) => n + 1);
        }

        if (e.key === 'ArrowLeft') {
            currenPicture.update((n) => n - 1);
        }
    });

    // Scroll through images
    function scrollThroughImages(e: WheelEvent) {
        if (!isOpen) return;

        if (e.deltaY > 0) {
            currenPicture.update((n) => n + 1);
        } else {
            currenPicture.update((n) => n - 1);
        }
    }

    onMount(() => {
        picture_el.addEventListener('wheel', scrollThroughImages);
    });
</script>

<div>

    <!-- Lightbox -->
    <div class="fixed top-0 left-0 w-full h-screen overflow-hidden bg-neutral-900/50 flex flex-col z-[1000] backdrop-blur-md transition-all {isOpen ? 'opacity-100': 'opacity-0 pointer-events-none'}">
        <div class="flex justify-between bg-neutral-950/50 p-2 items-center">
            <div>[{$currenPicture + 1}/{pictureList.length}] {pictureList[$currenPicture].alt || pictureList[$currenPicture].url}</div>
            <div>
                <button class="btn-dark" on:click={() => { isOpen = false }}>Close</button>
            </div>
        </div>

        <div class="grow overflow-hidden flex">
            <div class="min-h-full w-72 bg-neutral-950/50 overflow-auto shrink-0">
                <div class="p-2">Images</div>

                <div class="flex justify-between p-2 gap-2 sticky top-0">
                    <button class="btn-dark" on:pointerdown={() => { $currenPicture -= 1 }}>Previous</button>
                    <button class="btn-dark" on:pointerdown={() => { $currenPicture += 1 }}>Next</button>
                </div>

                {#each pictureList as picture, i}
                    <img src={picture.url} alt={picture.alt} class="w-full object-cover h-24 hover:h-48 transition-all border-blue-500 {$currenPicture == i ? 'border-l-8': ''}" on:click={() => { $currenPicture = i }} />
                {/each}
            </div>
            <img src="{pictureList[$currenPicture].url}" alt="" class="object-contain w-full h-full grow" bind:this={picture_el}>
        </div>

    </div>

    <div class="container">
        <h2>Gallery</h2>
        <p class="mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore autem nihil, quam vitae libero inventore adipisci harum error qui animi at? Sit voluptatibus obcaecati facilis asperiores perferendis minima laudantium sapiente?</p>

        <button class="btn-dark" on:click={() => { isOpen = true }}>Open Gallery</button>
    </div>
</div>