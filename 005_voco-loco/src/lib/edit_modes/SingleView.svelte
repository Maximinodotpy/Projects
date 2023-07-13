<script lang="ts">
    import { tags } from "$lib/edit_modes/variables";
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { getContext } from "svelte";
    import calcJaroWincklerDistance from "./JaroWinkler";
    import SingleViewButton from "./SingleViewButton.svelte";
    import { page } from "$app/stores";

    const voci_file = getContext<Writable<VocabularyFile>>("voci_file");

    let current_word = 0

    function nextWord() {
        if (current_word < $voci_file.words.length - 1) {
            current_word++;
        }        
    }

    function previousWord() {
        if (current_word > 0) {
            current_word--;
        }
    }

    function goToSearchedWord() {
        const urlParams = new URLSearchParams(location?.search);
        if (urlParams.has('uuid')) {
            const uuid = urlParams.get('uuid');
            const index = $voci_file.words.findIndex(word => word.uuid === uuid);
            if (index !== -1) {
                current_word = index;
            }
    
            // Remove UUID from URL
            window?.history.replaceState({}, document?.title, location?.pathname);
        }
    }
    
    // Check if the url has the uuid paramert and if yes search for the word with the uuid and set it to be the current word
    onMount(() => {        
        goToSearchedWord();
    });
</script>

<div class="flex flex-col h-full overflow-hidden">
    <div class="flex justify-between overflow-auto border-b-normal shrink-0">
        <div>
            <button on:click={() => { $voci_file.removeWord(current_word) }} class="p-3 pr-4 ">Remove</button>
        </div>
        
        <div class="flex divide-x-normal shrink-0">
            <button on:click={() => { current_word = 0 }} class="p-3 pl-4">⏮</button>
            <button on:click={previousWord} class="p-3">⏪</button>
            <button on:click={nextWord} class="p-3">⏩</button>
            <button on:click={() => { current_word = $voci_file.words.length - 1 }} class="p-3">⏭</button>
        </div>
    </div>

    <div class="grid gap-5 px-5 pt-4 overflow-auto md:px-10 md:grid-cols-2 grow">
        <div>
            <h2 class="mb-5 text-2xl">
                Single View for 
                <input type="number" value={current_word} min="0" max={$voci_file.words.length - 1} class="text-right" on:input={(ev) => { current_word = Number(ev.target.value);}}>/{ $voci_file.words.length }
            </h2>
        
            <p class="mb-5">Added on <code class="inline-block p-1"> { new Date($voci_file.words[current_word].created ?? 0).toLocaleString() } </code></p>
            
            <div class="flex flex-wrap gap-[10%] mb-5">
                {#each $voci_file.languages as lang}
                    <div class="w-[45%]">
                        <div>
                            <h3 class="mb-3 font-bold">{lang}</h3>
                            <input type="text" bind:value={$voci_file.words[current_word].translations[lang]} class="w-full p-2 border-2 border-b-4 focus:outline-none" />
                        </div>

                        <div class="p-2 text-sm border">
                            <!-- Compare this word in this language to all other words in this language and find similiarities -->
                            <h3 class="mb-3 text-base">Similar words</h3>
                            {#each $voci_file.words.filter(word => word.uuid !== $voci_file.words[current_word].uuid) as similar_word}
                            {@const distance = calcJaroWincklerDistance(similar_word.translations[lang], $voci_file.words[current_word].translations[lang])}
                                {#if distance > 0.90}
                                    <div class="flex justify-between">
                                        <p class="mb-2 italic">"{similar_word.translations[lang]}" <SingleViewButton uuid={similar_word.uuid}/></p>
                                        <p class="text-gray-500">Similarity: {Math.round(distance * 100)}</p>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    
        <div>
            <div class="grid grid-cols-2 mb-10 md:grid-cols-3">
                {#each tags as tag}
                    <label class="inline-flex items-center mr-5">
                        <input type="checkbox" bind:group={$voci_file.words[current_word].tags} value={tag} />
                        <span class="ml-2">{tag}</span>
                    </label>
                {/each}
            </div>
    
    
            <div class="my-8">
                <textarea class="w-full p-2 border-2 border-b-4 resize-none focus:outline-none" cols="30" rows="10" bind:value={$voci_file.words[current_word].description} placeholder="Description"></textarea>
            </div>
        </div>
    </div>
</div>
