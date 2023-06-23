<script lang="ts">
    import SingleViewButton from './SingleViewButton.svelte';
    import type { VociFile, Word } from "$lib/edit_modes/word_type";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    const voci_file = getContext<Writable<VociFile>>("voci_file");

    function moveDown(id: number) {
        const temp = $voci_file.words[id + 1]
        $voci_file.words[id + 1] = $voci_file.words[id]
        $voci_file.words[id] = temp
    }
    function moveUp(id: number) {
        const temp = $voci_file.words[id - 1]
        $voci_file.words[id - 1] = $voci_file.words[id]
        $voci_file.words[id] = temp
    }

    /* function sortFunction(el1: Word, el2: Word)  { 
        return el2.translations.English.localeCompare(el1.translations.English)
    } */
</script>

<table class="w-full mb-5 overflow-x-auto whitespace-nowrap">
    <thead class="sticky top-0 z-50 bg-white shadow-lg">
        <tr class="text-left">
            <th class="p-2"></th>
            <th class="p-2"></th>
            <th class="p-2">Created</th>
            <th class="p-2">#</th>
            {#each $voci_file.languages as lang}
                <th class="p-2">{lang}</th>
            {/each}
            <th>Tags</th>
            <th class="p-0">🧨</th>
        </tr>
    </thead>
    <tbody class="divide-y-2 divide-neutral-300">
        {#each $voci_file.words as word, index (word.uuid)}
            <tr>
                <td class="p-2 text-center">
                    {#if index != 0}
                        <button on:click={() => { moveUp(index) }}>⬆</button>
                    {/if}
                </td>
                <td class="p-2 text-center">
                    {#if index < $voci_file.words.length - 1}
                        <button on:click={() => { moveDown(index) }}>⬇</button>
                    {/if}
                </td>
                <td>{ new Date(word.created ?? 0).toLocaleString() }</td>
                <td class="p-2 text-left">
                    {index + 1} 
                    <SingleViewButton uuid={word.uuid}/>
                </td>
                {#each $voci_file.languages as lang}
                    <td>
                        {#if lang in word.translations}
                            <input
                                type="text"
                                value={word.translations[lang]}
                                on:input={(ev) => {
                                    word.translations[lang] = ev.target.value
                                }}
                                class="w-full p-2 bg-transparent focus:outline-none"
                            />
                        {/if}
                    </td>
                {/each}

                <td>
                    {#each word.tags as tag}
                        <span class="text-xs">
                            {tag}
                        </span>
                    {/each}
                </td>

                <td>
                    <button on:click={() => { $voci_file.removeWord(index) }}>❌</button> 
                <td/>
            </tr>
        {/each}
    </tbody>
</table>

<div class="p-4 mb-20">
    <button on:click={$voci_file.addWord}>Add Word</button>
</div>