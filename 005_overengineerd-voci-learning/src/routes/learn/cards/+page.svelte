<script lang="ts">
    import { getContext } from "svelte";
    import type { VociFile, Word } from '$lib/edit_modes/word_type';
    import type { Writable } from "svelte/store";
    import { tags, languages, languageNames } from '$lib/edit_modes/variables';
    import { base } from "$app/paths";

    const voci_file = getContext<Writable<VociFile>>("voci_file");

    let word_pool : Word[] = []
    let current_word_id = 0;
    let current_word_data : Word

    let target_language = "en";
    let origin_language = "de";
    let allowed_tags : string[] = [];
    let inputContent = ''
    let current_word_element : HTMLElement
    let show_solution = false

    // Reget current word when options change
    $: {
        target_language = target_language
        origin_language = origin_language
        allowed_tags = allowed_tags
        $voci_file = $voci_file
        
        newWord();
    }

    newWord();

    let points = 0;

    function keydownCallback(event: KeyboardEvent) {
        console.log(event);
        console.log(current_word_data.translations[target_language].toLowerCase());

        if (event.key == 'Enter' && !event.ctrlKey) {
            if (inputContent.toLowerCase() == current_word_data.translations[target_language].toLowerCase()) {
                console.log("Correct");

                inputContent = ''

                // @ts-ignore
                if (!show_solution) {
                    points++;

                    (async () => {
                        const canvas : HTMLElement | null = document.getElementById("bg-canvas");
    
                        if (!canvas) return;
                        // you should  only initialize a canvas once, so save this function
                        // we'll save it to the canvas itself for the purpose of this demo
                        // @ts-ignore
                        canvas.confetti = canvas.confetti || (await confetti.create(canvas, { resize: true }));
                        
                        // @ts-ignore
                        canvas.confetti({
                            spread: 20,
                            particleCount: 200,
                            origin: { y: 1.2 },
                        });
                    })();
                };

                newWord();
            } else {
                console.log("Wrong");

                const error_classes = ['text-red-800', 'error_wiggle']

                current_word_element.classList.add(...error_classes);

                setTimeout(() => {
                    current_word_element.classList.remove(...error_classes);
                }, 500);
            }
        } else if (event.key == 'Enter' && event.ctrlKey) {
            if (!show_solution) {
                show_solution = true;
            } else {
                newWord();
                show_solution = false;
            }
        }
    }

    function newWord() {
        show_solution = false;
        inputContent = ''
        
        word_pool = $voci_file.words.filter(word => {            
            if (allowed_tags.length == 0) {
                return true;
            } else {
                return word.tags.some(tag => allowed_tags.includes(tag));
            }
        })

        current_word_id = Math.random() * word_pool.length | 0

        console.log(current_word_id);

        current_word_data = word_pool[current_word_id];
    }
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.10.1/tsparticles.confetti.bundle.min.js"></script>
</svelte:head>

<div class="flex divide-x-[1.5px] h-full overflow-x-hidden">
    <div class="w-[400px] px-4 py-2">
        <h2 class="mb-5 text-2xl">Options</h2>

        <div class="mb-5">
            <h3 class="mb-3 text-xl">Tags</h3>

            <div class="my-3 mb-5 text-xs">
                <!-- <button class="px-2 py-1 rounded-md bg-neutral-100">Select All</button>
                <button class="px-2 py-1 rounded-md bg-neutral-100">Deselect All</button>
                <button class="px-2 py-1 rounded-md bg-neutral-100">Reverse Selection</button> -->

                {word_pool.length} words in pool
            </div>

            <div class="flex flex-wrap gap-2">
                {#each tags as tag}
                    <label for={tag} class="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 rounded-md">
                        <input bind:group={allowed_tags} type="checkbox" value={tag} id={tag}>
                        {tag}
                    </label>
                {/each}
            </div>
        </div>

        <div class="mb-7">
            <h3 class="mb-3 text-xl">Target and Origin Language</h3>

            <div>
                <label for="" class="flex items-center gap-3 mb-3">
                    <span>Target</span>
                    
                    <select bind:value={target_language} class="px-2 py-1 bg-blue-100 rounded-md">
                        {#each languages as language}
                            {#if language != origin_language}
                                <option value={language}>{languageNames[language]}</option>
                            {/if}
                        {/each}
                    </select>
                </label>
                
                
                <label for="" class="flex items-center gap-3">
                    <span>Origin</span>
                    
                    <select bind:value={origin_language} class="px-2 py-1 bg-blue-100 rounded-md">
                        {#each languages as language}
                            {#if language != target_language}
                                <option value={language}>{languageNames[language]}</option>
                            {/if}
                        {/each}
                    </select>
                </label>
            </div>
        </div>

        <div>
            Press <kbd>enter</kbd> to check the answer and <kbd>ctrl + enter</kbd> to view the solution.
        </div>
    </div>
    <div class="flex flex-col overflow-hidden grow">
        <div class="relative text-5xl grow">
            <div class="absolute flex items-center justify-center w-full h-full transition-colors" bind:this={current_word_element}>
                {current_word_data.translations[origin_language]} 
                
                {#if show_solution}
                    = {current_word_data.translations[target_language]}
                {/if}
            </div>
            <canvas id="bg-canvas" class="absolute w-full h-full"></canvas>
        </div>
        <div class="border-t-[1.5px] py-2 px-6 flex justify-between">
            <div>{ points } Points</div>
            <div>
                <a href="{base}/edit?uuid={current_word_data.uuid}">Edit this Word</a>
            </div>
        </div>
        <input type="text" class="border-t-[1.5px] p-6 text-2xl focus:outline-none" placeholder={`Answer in ${languageNames[target_language]}`} on:keydown={keydownCallback} bind:value={inputContent}>
    </div>
</div>