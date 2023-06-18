<script lang="ts">
    import { getContext } from "svelte";
    import type { VociFile } from '$lib/edit_modes/word_type';
    import type { Writable } from "svelte/store";
    import { tags } from '$lib/edit_modes/variables';
    let words = []

    const voci_file = getContext<Writable<VociFile>>("voci_file");

    let current_word = Math.random() * $voci_file.words.length | 0;

    let target_language = "en";
    let origin_language = "de";
</script>

<div class="flex divide-x-[1.5px] h-full">
    <div class="w-[400px] px-4 py-2">
        {#if $voci_file.words.length == 0}
            Start By importing or creating a Quiz First
        {:else}
            <h2 class="mb-5 text-2xl">Options</h2>

            <div class="mb-5">
                <h3 class="mb-3 text-xl">Tags</h3>

                <div class="my-3 mb-5 text-sm">
                    <button class="px-2 py-1 rounded-md bg-neutral-100">Select All</button>
                    <button class="px-2 py-1 rounded-md bg-neutral-100">Deselect All</button>
                    <button class="px-2 py-1 rounded-md bg-neutral-100">Reverse Selection</button>
                </div>

                <div class="flex flex-wrap gap-2">
                    {#each tags as tag}
                        <button class="px-2 py-1 bg-blue-100 rounded-md">{tag}</button>
                    {/each}
                </div>
            </div>

            <div class="mb-3">
                <h3 class="mb-3 text-xl">Target and Origin Language</h3>

                <div>
                    <label for="" class="flex items-center gap-3 mb-3">
                        <span>Target</span>
                        
                        <select bind:value={target_language} class="px-2 py-1 bg-blue-100 rounded-md">
                            <option value="en">English</option>
                            <option value="de">German</option>
                            <option value="es">Spanish</option>
                        </select>
                    </label>
                    
                    
                    <label for="" class="flex items-center gap-3">
                        <span>Origin</span>
                        
                        <select bind:value={origin_language} class="px-2 py-1 bg-blue-100 rounded-md">
                            <option value="en">English</option>
                            <option value="de">German</option>
                            <option value="es">Spanish</option>
                        </select>
                    </label>
                </div>
            </div>
        {/if}
    </div>
    <div class="flex flex-col grow">
        <div class="grid text-3xl grow place-content-center">
            {$voci_file.words[current_word].translations[origin_language]}
        </div>
        <input type="text" class="border-t-[1.5px] p-6 text-2xl focus:outline-none" placeholder={`Answer in ${target_language}`}>
    </div>
</div>