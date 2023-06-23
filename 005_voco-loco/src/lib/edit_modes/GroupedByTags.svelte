<script lang="ts">
    import { tags } from "$lib/edit_modes/variables";
    import type { VociFile } from "$lib/edit_modes/word_type";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import SingleViewButton from "$lib/edit_modes/SingleViewButton.svelte";

    const voci_file = getContext<Writable<VociFile>>("voci_file");
</script>


<div class="max-w-5xl p-5 mx-auto">
    {#each tags as tag}
        <h2 class="mb-5 text-2xl">{tag}</h2>
        <table class="w-full mb-10 bg-neutral-100">
            <thead class="sticky top-0 shadow-md bg-neutral-100">
                <tr>
                    <th class="p-2 text-left">
                        #
                    </th>
                    {#each $voci_file.languages as lang}
                        <th class="p-2 text-left">{lang}</th>
                    {/each}
                </tr>
            </thead>

            {#each $voci_file.words.filter(word => word.tags.includes(tag)) as word, index}
                <tr>
                    <td class="p-2 text-left">
                        { index + 1 }
                        <SingleViewButton uuid={word.uuid}/>
                    </td>
                    {#each $voci_file.languages as lang}
                        <td>
                            <input type="text" bind:value={word.translations[lang]} class="w-full p-2 bg-neutral-100" />
                        </td>
                    {/each}
                </tr>
            {/each}
        </table>
    {/each}
</div>