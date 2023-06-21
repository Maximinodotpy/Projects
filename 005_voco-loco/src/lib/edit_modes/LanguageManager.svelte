<script lang="ts">
    import type { VociFile } from "$lib/edit_modes/word_type";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    const voci_file = getContext<Writable<VociFile>>("voci_file");

    let current_new_language = "";

    function addNewLangauge() {
        $voci_file.languages.push(current_new_language);
        $voci_file.languages = $voci_file.languages;
        $voci_file.recompileLangauges();
        current_new_language = "";
    }
</script>

<div class="max-w-5xl p-5 mx-auto">
    {#each $voci_file.languages as lang}
        <div>
            { lang }
        </div>
    {/each}
    <input type="text" placeholder="New Language" bind:value={current_new_language}>
    <button on:click={addNewLangauge}>Add</button>

    <!-- <pre>{ JSON.stringify($voci_file, null, 2) }</pre> -->
</div>