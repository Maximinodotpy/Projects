<script lang="ts">
    import SingleView from "$lib/edit_modes/SingleView.svelte";
    import ListView from "$lib/edit_modes/ListView.svelte";
    import GroupedByTags from "$lib/edit_modes/GroupedByTags.svelte";
    import LanguageManager from "$lib/edit_modes/LanguageManager.svelte";
    import DeduplicationView from "$lib/edit_modes/DeduplicationView.svelte";
    import CSVView from "$lib/edit_modes/CSVView.svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { onMount } from 'svelte';
    import { page } from '$app/stores' 

    const view_modes = [
        ['List', ListView ],
        ['Single', SingleView ],
        ['Grouped By Tags', GroupedByTags ],
        ['CSV', CSVView],
        ['Languages', LanguageManager ],
        ['Deduplication', DeduplicationView ],
    ]
    let current_view_mode = 0
    /* $: {
        // @ts-ignore
        document.getElementById(`view-${current_view_mode}`)?.scrollIntoView({
            behavior: 'smooth',
        });
    } */
    const voci_file = getContext<Writable<VocabularyFile>>("voci_file");

    function handleSearchParams() {
        if (typeof location !== 'undefined') {
            const urlParams = new URLSearchParams(location.search);
            if (urlParams.has('uuid')) {
                current_view_mode = 1
            }
        }
    }

    onMount(() => {
        handleSearchParams()
        page.subscribe(handleSearchParams)
        
        window.addEventListener('keydown', (e) => {
            if (e.altKey && e.ctrlKey && e.key == 'ArrowRight') {
                e.preventDefault()
                current_view_mode = (current_view_mode + 1) % view_modes.length
            } 
            
            // Switch to previous view mode on ctrl + shift + tab
            if (e.altKey && e.ctrlKey && e.key == 'ArrowLeft') {
                e.preventDefault()
                current_view_mode = (current_view_mode - 1 + view_modes.length) % view_modes.length
            }
        })
    })
</script>

<div class="flex items-center justify-between pl-4 overflow-auto border-b-normal shrink-0 whitespace-nowrap">
    <div class="flex w-full gap-5 md:gap-10 shrink-0">
        <button on:click={$voci_file.addWord} class="py-3">Add New Word</button>

        <div class="flex items-center gap-5 ml-auto">
            <div class="flex items-center h-full divide-x-normal border-l-normal scroll-smooth">
                {#each view_modes as view_mode, index (view_mode[0])}
                    <label class={`py-1 px-3 flex items-center border-b-2 h-full ${current_view_mode == index ? 
                    'border-b-blue-500 bg-gradient-to-b from-transparent from-75% to-blue-800/50' 
                    : 
                    'border-b-transparent hover:border-b-blue-500/50'}`} id={`view-${index}`}>
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

