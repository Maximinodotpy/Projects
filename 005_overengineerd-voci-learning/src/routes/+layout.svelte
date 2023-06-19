<script lang="ts">
    import '../app.css';
    import  { base } from '$app/paths';
    import { page } from '$app/stores';
    import { writable } from 'svelte/store';
    import { setContext } from 'svelte';
    import type { VociFile } from '$lib/edit_modes/word_type';
    import type { Word } from '$lib/edit_modes/word_type';
    import { languages } from "$lib/edit_modes/variables";

    const voci_file = writable<VociFile>({
        file_handle: null,
        words: [],
        removeWord: (id: number) => {
            if ($voci_file.words.length == 1) return;

            console.log("Removing word with id " + id);
            
            $voci_file.words.splice(id, 1);

            $voci_file.words = $voci_file.words;
        },
        addWord() {
            // Loop through languages and add empty word to each language
            let newWord: Word = {
                type: "",
                description: "",
                tags: [],
                created: Date.now(),
                uuid: crypto.randomUUID(),
                translations: {},
            };
            for (let i = 0; i < languages.length; i++) {
                newWord.translations[languages[i]] = "";
            }
            $voci_file.words.push(newWord);

            $voci_file.words = $voci_file.words;
        }
    });
    setContext("voci_file", voci_file);

    let autoSaveIntervalID = 0;
    let lastSavedWords: Word[] = [];
    $voci_file.words = []

    $voci_file.addWord();
    
    $: has_unsaved_changes = JSON.stringify($voci_file.words) == JSON.stringify(lastSavedWords);
    lastSavedWords = JSON.parse(JSON.stringify($voci_file.words));

    async function openFile() {
        // @ts-ignore
        let [fh] = await window.showOpenFilePicker();
        $voci_file.file_handle = fh;

        // @ts-ignore
        const file: Blob = await $voci_file.file_handle.getFile();

        $voci_file.words = await file.text().then(JSON.parse);
        // Loop over words and add a uuid to each word if it does not have one
        for (let i = 0; i < $voci_file.words.length; i++) {
            if (!$voci_file.words[i].uuid) {
                $voci_file.words[i].uuid = crypto.randomUUID();
            }
        }
        lastSavedWords = JSON.parse(JSON.stringify($voci_file.words));

        autoSaveIntervalID = setInterval(() => {
            if (JSON.stringify($voci_file.words) != JSON.stringify(lastSavedWords)) {
                console.log("Autosaving...");

                saveFile();
            }
        }, 1000 * 15);
    }

    async function saveFile() {
        if (!$voci_file.file_handle) {
            saveFileAs();
            return;
        }

        // @ts-ignore
        const writable = await $voci_file.file_handle.createWritable();
        await writable.write(JSON.stringify($voci_file.words, null, 4));
        await writable.close();

        lastSavedWords = JSON.parse(JSON.stringify($voci_file.words));
    }

    async function saveFileAs() {
        // @ts-ignore
        $voci_file.file_handle = await window.showSaveFilePicker();

        // @ts-ignore
        const writable = await $voci_file.file_handle.createWritable();
        await writable.write(JSON.stringify($voci_file.words, null, 4));
        await writable.close();

        lastSavedWords = JSON.parse(JSON.stringify($voci_file.words));
    }
</script>

<div class="flex flex-col h-screen overflow-hidden">
    <div class="border-b-[1.5px] px-4 py-2 flex justify-between items-center">
        <div>
            <a class="inline-block mr-3 font-mono font-semibold" href={`${base}/`}>Loco Voco</a>
            |
            <a class={`inline-block p-2 italic ${$page.route.id == '/edit' ? 'underline': '' }`} href={`${base}/edit`}>Chart Editor</a>
            or
            <a class={`inline-block p-2 italic ${$page.route.id == '/learn' ? 'underline': '' }`} href={`${base}/learn`}>Learn</a>
        </div>

        <div class="flex items-center gap-4">
            <button on:click={openFile}>Open</button>
            <button on:click={saveFile}>Save</button>

            <div class="font-mono">
                <span class="font-bold text-red-600">{has_unsaved_changes? "": "*"}</span>{$voci_file.file_handle ? $voci_file.file_handle.name : "New File"}
            </div>
        </div>
    </div>
    
    <div class="overflow-auto grow">
        <slot></slot>
    </div>
</div>