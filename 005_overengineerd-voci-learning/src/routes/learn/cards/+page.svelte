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

    // Reget current word when options change
    $: {
        target_language = target_language
        origin_language = origin_language
        allowed_tags = allowed_tags
        
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

                newWord();

                points++;
            } else {
                console.log("Wrong");
            }
        } else if (event.key == 'Enter' && event.ctrlKey) {
            newWord();
        }
    }

    function newWord() {
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

<div class="flex divide-x-[1.5px] h-full">
    <div class="w-[400px] px-4 py-2">
        {#if $voci_file.words.length == 0}
            Start By importing or creating a Quiz First
        {:else}
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
                        <label for={tag} class="px-2 py-1 bg-blue-100 rounded-md">
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
                Press <kbd>enter</kbd> to check the answer and <kbd>ctrl + enter</kbd> to skip the current word.
            </div>
        {/if}
    </div>
    <div class="flex flex-col grow">
        <div class="grid text-3xl grow place-content-center">
            {current_word_data.translations[origin_language]}
        </div>
        <div class="border-t-[1.5px] py-2 px-6 flex justify-between">
            <div>{ points } Points</div>
            <div>
                <a href="{base}/edit?uuid={current_word_data.uuid}">Edit</a>
            </div>
        </div>
        <input type="text" class="border-t-[1.5px] p-6 text-2xl focus:outline-none" placeholder={`Answer in ${languageNames[target_language]}`} on:keydown={keydownCallback} bind:value={inputContent}>
    </div>
</div>