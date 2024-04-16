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
        source?: string;
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
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Atomic_cloud_over_Hiroshima_-_NARA_542192_-_Edit.jpg/800px-Atomic_cloud_over_Hiroshima_-_NARA_542192_-_Edit.jpg',
            alt: 'Atompilz von „Little Boy“ über Hiroshima (6. August 1945)',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nagasakibomb.jpg/800px-Nagasakibomb.jpg',
            alt: 'Atompilz von „Fat Man“ über Nagasaki (9. August 1945)',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Trinity_Test_-_Oppenheimer_and_Groves_at_Ground_Zero_002.jpg/800px-Trinity_Test_-_Oppenheimer_and_Groves_at_Ground_Zero_002.jpg',
            alt: 'Robert Oppenheimer und Leslie Groves begutachten Überreste des Bombenturms des Trinity-Tests, der ersten Zündung einer Atombombe.',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Bundesarchiv_Bild_183-29645-0001%2C_Potsdamer_Konferenz%2C_Stalin%2C_Truman%2C_Churchill.jpg/1280px-Bundesarchiv_Bild_183-29645-0001%2C_Potsdamer_Konferenz%2C_Stalin%2C_Truman%2C_Churchill.jpg',
            alt: 'Josef Stalin (zweiter von links), Harry S. Truman (Mitte) und Winston Churchill während der Potsdamer Konferenz, Juli 1945',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Letter_received_from_General_Thomas_Handy_to_General_Carl_Spaatz_authorizing_the_dropping_of_the_first_atomic_bomb_-_NARA_-_542193.tif/lossy-page1-800px-Letter_received_from_General_Thomas_Handy_to_General_Carl_Spaatz_authorizing_the_dropping_of_the_first_atomic_bomb_-_NARA_-_542193.tif.jpg',
            alt: 'Der Einsatzbefehl vom 25. Juli 1945',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/77-BT-116_%2820709498048%29.jpg/1280px-77-BT-116_%2820709498048%29.jpg',
            alt: '„Little Boy“ wird in den Bombenschacht der Enola Gay gehoben',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Enola_Gay_%28plane%29.jpg',
            alt: 'The Enola Gay',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/AtomicEffects-Hiroshima.jpg/1024px-AtomicEffects-Hiroshima.jpg',
            alt: 'Blick auf die zerstörte Stadt vom Krankenhaus aus nordwestlich',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Fat_Man_Assembled_Tinian_1945.jpg/1280px-Fat_Man_Assembled_Tinian_1945.jpg',
            alt: 'Die Fat-Man-Bombe wird für den Angriff vorbereitet',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Atomic_cloud_over_Nagasaki_from_Koyagi-jima.jpeg/1280px-Atomic_cloud_over_Nagasaki_from_Koyagi-jima.jpeg',
            alt: 'Die aufsteigende Wolke kurz nach der Explosion, fotografiert von Matsuda Hiromichi in einem Außenbezirk der Stadt (9. August 1945)',
        },
        {
            url: 'https://www.atomicarchive.com/media/videos/media/hiroshima.mp4',
            alt: 'The Atomic Bombing of Hiroshima',
            source: 'https://www.atomicarchive.com/media/videos/hiroshima.html'
        },
        {
            url: 'https://archive.org/download/realfootageatomicbombhiroshimaandnagasaki_202003/Real%20Footage%20-%20Atomic%20Bomb-%20Hiroshima%20and%20Nagasaki.mp4',
            alt: 'Real Footage - Atomic Bomb- Hiroshima and Nagasaki',
            source: 'https://archive.org/details/realfootageatomicbombhiroshimaandnagasaki_202003'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6d/Hiroshima_Aftermath_1946_USAF_Film.ogv/Hiroshima_Aftermath_1946_USAF_Film.ogv.360p.vp9.webm',
            alt: 'Filmaufnahmen der US-Armee von Hiroshima, 1946.',
            source: 'https://de.wikipedia.org/wiki/Atombombenabw%C3%BCrfe_auf_Hiroshima_und_Nagasaki'
        },
        {
            url: 'https://beyondnuclearinternational.org/wp-content/uploads/2018/06/demo.jpg',
            alt: 'Trinity Downwinders continue to demand recognition and compensation. (Photo: Concerned Citizens for Nuclear Safety)',
            source: 'https://beyondnuclearinternational.org/2018/07/16/dancing-in-the-dust-of-death/'
        },
        {
            url: 'https://i.guim.co.uk/img/media/789ff1f5db9a131ef6064f3eaca90ea070dddcd6/0_0_2940_1969/master/2940.jpg?width=620&dpr=2&s=none',
            alt: 'The base camp at the Trinity nuclear test site. Photograph: Corbis via Getty Images',
            source: 'https://www.theguardian.com/us-news/2024/mar/10/new-mexico-oppenheimer-atomic-bomb-nuclear',
        },
        {
            url: 'https://i.guim.co.uk/img/media/d66faf5530efe66a89cf42ed08c60f2aae0c62df/0_0_3760_2507/master/3760.jpg?width=620&dpr=2&s=none',
            alt: 'The test tower. Photograph: Corbis via Getty Images',
            source: 'https://www.theguardian.com/us-news/2024/mar/10/new-mexico-oppenheimer-atomic-bomb-nuclear',
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
            <div class="overflow-hidden whitespace-nowrap text-ellipsis">[{$currenPicture + 1}/{pictureList.length}] {pictureList[$currenPicture].alt || pictureList[$currenPicture].url}</div>
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
                    <!-- Check if the url is a vidoe -->
                    {#if picture.url.includes('.mp4')}
                        <video src={picture.url} autoplay loop class="w-full object-cover h-24 hover:h-48 transition-all border-blue-500 {$currenPicture == i ? 'border-l-8': ''}" on:click={() => { $currenPicture = i }}></video>
                    {:else}
                        <img src={picture.url} alt={picture.alt} class="w-full object-cover h-24 hover:h-48 transition-all border-blue-500 {$currenPicture == i ? 'border-l-8': ''}" on:click={() => { $currenPicture = i }} />
                    {/if}
                {/each}
            </div>

            <!-- Check if the url is a video -->
            {#if pictureList[$currenPicture].url.includes('.mp4')}
                <video src={pictureList[$currenPicture].url} autoplay controls loop class="object-contain w-full h-full grow"></video>
            {:else}
                <img src="{pictureList[$currenPicture].url}" alt="" class="object-contain w-full h-full grow" bind:this={picture_el}>
            {/if}
        </div>

    </div>

    <div class="container">
        <h2>Gallery</h2>
        <p class="mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore autem nihil, quam vitae libero inventore adipisci harum error qui animi at? Sit voluptatibus obcaecati facilis asperiores perferendis minima laudantium sapiente?</p>

        <button class="btn-dark" on:click={() => { isOpen = true }}>Open Gallery</button>
    </div>
</div>