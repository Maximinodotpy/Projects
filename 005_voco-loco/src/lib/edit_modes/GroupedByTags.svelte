<script lang="ts">
    import { flip } from "svelte/animate";
    import type { Word } from "$lib/edit_modes/word_type";
    import { languages } from "$lib/edit_modes/variables";
    import { tags } from "$lib/edit_modes/variables";
    import { languageNames } from "$lib/edit_modes/variables";

    export let words: Word[] = [];
</script>


<div class="max-w-5xl p-5 mx-auto">
    {#each tags as tag}
        <h2 class="mb-5 text-2xl">{tag}</h2>
        <table class="w-full mb-10 bg-neutral-100">
            <thead class="sticky top-0 shadow-md bg-neutral-100">
                <tr>
                    <th class="p-2 text-left">#</th>
                    {#each languages as lang}
                        <th class="p-2 text-left">{languageNames[lang]}</th>
                    {/each}
                </tr>
            </thead>

            {#each words.filter(word => word.tags.includes(tag)) as word, index}
                <tr>
                    <td class="p-2 text-left">{ index + 1 }</td>
                    {#each languages as lang}
                        <td>
                            <input type="text" bind:value={word.translations[lang]} class="w-full p-2 bg-neutral-100" />
                        </td>
                    {/each}
                </tr>
            {/each}
        </table>
    {/each}
</div>