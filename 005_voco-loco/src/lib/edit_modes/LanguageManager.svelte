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

    function getfilledOutWordsByLanguage(lang: string) {
        let count = 0;
        for (const word of $voci_file.words) {
            if (word.translations[lang] != "") {
                count++;
            }
        }
        return count;
    }

    function renameLanguage(origin: string) {
        const new_name = prompt("New name for " + origin);

        if (new_name == null) return;

        $voci_file.languages.push(new_name);

        $voci_file.languages.splice($voci_file.languages.indexOf(origin), 1);

        $voci_file.languages = $voci_file.languages;
        
        for (const word of $voci_file.words) {
            word.translations[new_name] = word.translations[origin];
            delete word.translations[origin];
        }
    }

    function removeLanguage(lang: string) {
        if (!confirm("Are you sure you want to remove " + lang + "?")) return;

        $voci_file.languages.splice($voci_file.languages.indexOf(lang), 1);
        $voci_file.languages = $voci_file.languages;
        
        for (const word of $voci_file.words) {
            delete word.translations[lang];
        }
    }
</script>

<div class="max-w-5xl p-5 mx-auto">

    <table class="w-full">
        <tr class="text-left">
            <th>Name</th>
            <th>Filled Out Words</th>
            <th>Rename</th>
            <th>Delete</th>
        </tr>
        <tbody>
            {#each $voci_file.languages as lang}
                <tr>
                    <td>
                        {lang}
                    </td>
                    <td>
                        { getfilledOutWordsByLanguage(lang) } / { $voci_file.words.length }
                    </td>
                    <td>
                        <button on:click={ () => { renameLanguage(lang) }}>Rename</button>
                    </td>
                    {#if $voci_file.languages.length > 1}
                        <td>
                            <button on:click={ () => { removeLanguage(lang) }}>Remove</button>
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="mt-8">
        <input type="text" placeholder="New Language" bind:value={current_new_language} class="p-2 border-2 border-b-4 placeholder:text-neutral-500">
        <button on:click={addNewLangauge} class="ml-4">Add</button>
    </div>
</div>