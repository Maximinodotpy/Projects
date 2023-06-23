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
        if (typeof location !== 'undefined') {
            const urlParams = new URLSearchParams(location.search);
            if (urlParams.has('uuid')) {
                current_view_mode = 1
            }
        }
    }

    onMount(handleSearchParams)

    page.subscribe(handleSearchParams)

    // Switch to next view mode on ctrl + tab
    window.addEventListener('keydown', (e) => {
        console.log(e);
        
        if (e.ctrlKey && e.key == 'ArrowRight') {
            e.preventDefault()
            current_view_mode = (current_view_mode + 1) % view_modes.length
        } 
        
        // Switch to previous view mode on ctrl + shift + tab
        if (e.ctrlKey && e.key == 'ArrowLeft') {
            e.preventDefault()
            current_view_mode = (current_view_mode - 1 + view_modes.length) % view_modes.length
        }
    })
</script>

<div class="flex justify-between border-b-[1.5px] pl-4 items-center overflow-auto shrink-0 whitespace-nowrap">
    <div class="flex w-full gap-5 md:gap-10 shrink-0">
        <button on:click={$voci_file.addWord} class="py-3">Add New Word</button>

        <div class="flex items-center gap-5 ml-auto">
            <div class="flex h-full divide-x-[1.5px] items-center border-l-[1.5px]">
                {#each view_modes as view_mode, index (view_mode[0])}
                    <label class={`py-1 px-3 flex items-center border-b-2 h-full ${current_view_mode == index ? 'border-b-blue-500 bg-gradient-to-b  from-white from-50% to-blue-100' : 'border-b-transparent'}`}>
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

