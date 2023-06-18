<script lang="ts">
    import type { Word } from "$lib/edit_modes/word_type";
    import { languages } from "$lib/edit_modes/variables";
    import { tags } from "$lib/edit_modes/variables";
    import { languageNames } from "$lib/edit_modes/variables";

    export let words : Word[] = [];
    export let removeWord: (id: number) => void;

    let current_word = 0

    function nextWord() {
        if (current_word < words.length - 1) {
            current_word++;
        }        
    }

    function previousWord() {
        if (current_word > 0) {
            current_word--;
        }
    }
</script>

<div class="max-w-5xl p-5 mx-auto">
    <h2 class="mb-5 text-2xl">Single View for <code>{ current_word + 1 }/{ words.length }</code></h2>
    
    <div class="grid grid-cols-2 gap-10 mb-5">
        {#each languages as lang}
            <div>
                <h3 class="mb-3 font-bold">{languageNames[lang]}</h3>
                <input type="text" bind:value={words[current_word].translations[lang]} class="w-full p-2 bg-neutral-100" />
            </div>
        {/each}
    </div>

    <div class="mb-10">
        {#each tags as tag}
            <label class="inline-flex items-center mr-5">
                <input type="checkbox" bind:group={words[current_word].tags} value={tag} />
                <span class="ml-2">{tag}</span>
            </label>
        {/each}
    </div>

    <div class="flex justify-between">
        <div>
            <button on:click={() => { current_word = 0 }} class="p-2 bg-blue-200">First Word</button>
            <button on:click={previousWord} class="p-2 bg-blue-200">Previous Word</button>
            <button on:click={nextWord} class="p-2 bg-blue-200">Next Word</button>
            <button on:click={() => { current_word = words.length - 1 }} class="p-2 bg-blue-200">Last Word</button>
        </div>

        <div>
            <button on:click={() => { removeWord(current_word) }}>Remove</button>
        </div>
    </div>
    
</div>