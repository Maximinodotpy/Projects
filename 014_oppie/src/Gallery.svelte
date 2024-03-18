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
        },
        {
            url: 'https://cms.outrider.org/sites/default/files/styles/fixed_width_sm/public/2018-09/Fat%20Man.jpg?itok=zZVKe6kS',
            alt: 'Fat Man being readied for its drop on Nagasaki. Los Alamos National Laboratory.',
        },
        {
            url: 'https://cms.outrider.org/sites/default/files/styles/fixed_height_portrait/public/2018-09/crew%20of%20the%20Enola%20Gay.jpg?itok=FWD4WFRI',
            alt: 'Colonel Paul Tibbets and the crew of the Enola Gay. Los Alamos National Laboratory',
        },
        {
            url: 'https://cms.outrider.org/sites/default/files/styles/fixed_height_portrait/public/2018-09/Tibbets%20and%20Enola%20Gay.JPG?itok=pT_ecsdf',
            alt: 'Colonel Paul Tibbets, pilot of the Enola Gay, poses in front of the plane. U.S. Air Force',
        },
        {
            url: 'https://cms.outrider.org/sites/default/files/styles/fixed_height_portrait/public/2018-09/Little_Boy_2.jpg?itok=XG8emZiN',
            alt: 'Little Boy awaits loading onto the Enola Gay. National Archives photo no. 77-BT-115'
        },
        {
            url: 'https://cms.outrider.org/sites/default/files/2018-09/Bomber%20clips2_0.mp4',
            alt: 'Bomber clips2_0.mp4'
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
        <div class="flex items-center justify-between p-2 bg-neutral-950/50">
            <div>[{$currenPicture + 1}/{pictureList.length}] {pictureList[$currenPicture].alt || pictureList[$currenPicture].url}</div>
            <div>
                <button class="btn-dark" on:click={() => { isOpen = false }}>Close</button>
            </div>
        </div>

        <div class="flex overflow-hidden grow">
            <div class="min-h-full overflow-auto w-72 bg-neutral-950/50 shrink-0">
                <div class="p-2">Images</div>

                <div class="sticky top-0 flex justify-between gap-2 p-2">
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