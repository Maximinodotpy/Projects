<script lang="ts">
    import SingleView from "$lib/edit_modes/SingleView.svelte";
    import ListView from "$lib/edit_modes/ListView.svelte";
    import GroupedByTags from "$lib/edit_modes/GroupedByTags.svelte";
    import LanguageManager from "$lib/edit_modes/LanguageManager.svelte";
    import DeduplicationView from "$lib/edit_modes/DeduplicationView.svelte";
    
    import { getContext } from "svelte";
    import type { VociFile } from '$lib/edit_modes/word_type';
    import type { Writable } from "svelte/store";
    import { onMount } from 'svelte';
    import { page } from '$app/stores' 

    const view_modes = [
        ['List', ListView ],
        ['Single', SingleView ],
        ['Grouped By Tags', GroupedByTags ],
        ['Languages', LanguageManager ],
        ['Deduplication', DeduplicationView ],
    ]
    let current_view_mode = 0
    const voci_file = getContext<Writable<VociFile>>("voci_file");

    function handleSearchParams() {
        console.log('Handle search params');
        
        const urlParams = new URLSearchParams(location.search);
        if (urlParams.has('uuid')) {
            current_view_mode = 1
        }
    }

    onMount(handleSearchParams)

    page.subscribe(handleSearchParams)
</script>

<div class="flex justify-between border-b-[1.5px] px-4 py-3 items-center">
    <div class="flex gap-5">
        <button on:click={$voci_file.addWord}>Add New Word</button>

        <div class="flex items-center gap-5 ml-10">
            <div>View Modes</div>

            <div class="flex gap-3">
                {#each view_modes as view_mode, index (view_mode[0])}
                    <label class={`py-1 px-2 bg-blue-100 ${current_view_mode == index ? 'font-semibold' : ''}`}>
                        <input type="radio" bind:group={current_view_mode} name="view_mode" value={index} class="hidden">
                        {view_mode[0]}
                    </label>
                {/each}
            </div>
        </div>
    </div>

</div>

<div class="overflow-auto grow">
    <svelte:component this={view_modes[current_view_mode][1]}  />
</div>

