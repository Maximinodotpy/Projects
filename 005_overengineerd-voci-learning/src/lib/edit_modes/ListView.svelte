<script lang="ts">
    import { flip } from "svelte/animate";
    import type { VociFile, Word } from "$lib/edit_modes/word_type";
    import { languages } from "$lib/edit_modes/variables";
    /* import { tags } from "$lib/edit_modes/variables"; */
    import { languageNames } from "$lib/edit_modes/variables";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let words: Word[] = [];
    const voci_file = getContext<Writable<VociFile>>("voci_file");

    function moveDown(id: number) {
        const temp = words[id + 1]
        words[id + 1] = words[id]
        words[id] = temp
    }
    function moveUp(id: number) {
        const temp = words[id - 1]
        words[id - 1] = words[id]
        words[id] = temp
    }
</script>

<table class="w-full mb-20">
    <thead class="sticky top-0 z-50 bg-blue-100 shadow-lg">
        <tr class="text-left">
            <th class="p-2 text-center"></th>
            <th class="p-2 text-center"></th>
            <th class="p-2">Created</th>
            <th class="p-2 text-center">#</th>
            {#each languages as lang}
                <th class="p-2">{languageNames[lang]}</th>
            {/each}
            <th>Tags</th>
            <th class="p-0">🧨</th>
        </tr>
    </thead>
    <tbody class="divide-y-2 divide-neutral-300">
        {#each words as word, index (word.uuid)}
            <tr class="group" animate:flip={{ duration: 200 }}>
                <td class="p-2 text-center">
                    {#if index != 0}
                        <button on:click={() => { moveUp(index) }}>⬆</button>
                    {/if}
                </td>
                <td class="p-2 text-center">
                    {#if index < words.length - 1}
                        <button on:click={() => { moveDown(index) }}>⬇</button>
                    {/if}
                </td>
                <td>{ new Date(word.created ?? 0).toLocaleString() }</td>
                <td class="p-2 text-center">{index + 1}</td>
                {#each languages as lang}
                    <td>
                        {#if lang in word.translations}
                            <input
                                type="text"
                                bind:value={word.translations[lang]}
                                class="w-full p-2 bg-transparent focus:outline-none"
                            />
                        {/if}
                    </td>
                {/each}

                <td class="relative w-32 overflow-hidden group-hover:overflow-visible group-focus-within:overflow-visible">
                    <div class="">
                        {#each word.tags as tag}
                            <span class="text-xs">
                                {tag}
                            </span>
                        {/each}
                    </div>
                </td>

                <td>
                    <button on:click={() => { $voci_file.removeWord(index) }}>❌</button> 
                <td/>
            </tr>
        {/each}
    </tbody>
</table>