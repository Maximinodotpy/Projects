<script lang="ts">
    import '../app.css';
    import  { base } from '$app/paths';
    import { page } from '$app/stores';
    import { writable } from 'svelte/store';
    import { setContext } from 'svelte';
    import { onMount } from 'svelte';
    
    let file_handle_api_supported = false
    onMount(() => {
        if ('showOpenFilePicker' in window) {
            file_handle_api_supported = true;
        }
    })

    const voci_file = writable<VocabularyFile>({
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
                description: "",
                tags: [],
                created: Date.now(),
                uuid: crypto.randomUUID(),
                translations: {},
            };
            
            for (let i = 0; i < $voci_file.languages.length; i++) {
                newWord.translations[$voci_file.languages[i]] = "";
            }
            $voci_file.words.push(newWord);

            $voci_file.words = $voci_file.words;
        },
        openFile: openFile,
        languages: [ 'English', 'Deutsch' ],
        recompileLangauges() {
            // Ensure that every word has a translation for every language but dont delete anything or overwrite

            for (let i = 0; i < $voci_file.words.length; i++) {
                for (let j = 0; j < $voci_file.languages.length; j++) {
                    if (!($voci_file.words[i].translations[$voci_file.languages[j]])) {
                        $voci_file.words[i].translations[$voci_file.languages[j]] = "";
                    }
                }
            }
        },
    });
    setContext("voci_file", voci_file);


    let autoSaveIntervalID = 0;
    $voci_file.words = []

    $voci_file.addWord();


    async function openFile(ev: Event | undefined) {
        let file : Blob;

        // @ts-ignore
        if (file_handle_api_supported) {
            let [fh] = await window.showOpenFilePicker();
            $voci_file.file_handle = fh;
            file = await fh.getFile();
        } else {
            file = ev.target.files[0];
        }

        $voci_file.words = await file.text().then(JSON.parse);
        // Loop over words and add a uuid to each word if it does not have one
        for (let i = 0; i < $voci_file.words.length; i++) {
            if (!$voci_file.words[i].uuid) {
                $voci_file.words[i].uuid = crypto.randomUUID();
            }
        }

        // Getting all languages from this file assuming it has at least one word
        $voci_file.languages = Object.keys($voci_file.words[0].translations);

        if (file_handle_api_supported) {
            autoSaveIntervalID = setInterval(() => {
                console.log("Autosaving...");
    
                saveFile();
            }, 1000 * 15);
        }
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
    }

    async function saveFileAs() {
        // @ts-ignore
        $voci_file.file_handle = await window.showSaveFilePicker();

        // @ts-ignore
        const writable = await $voci_file.file_handle.createWritable();
        await writable.write(JSON.stringify($voci_file.words, null, 4));
        await writable.close();
    }

    async function downloadFile() {
        const blob = new Blob([JSON.stringify($voci_file.words, null, 4)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'voci_file.json';
        a.click();
        URL.revokeObjectURL(url);
    }
</script>

<svelte:head>
    <title>Loco Voco</title>
    <meta name="description" content="Loco Voco is a tool to learn vocabulary.">
</svelte:head>

<div class="flex flex-col h-[100svh] overflow-hidden">
    <div class="border-b-[1.5px] px-4 py-2 flex justify-between items-center whitespace-nowrap overflow-auto shrink-0">
        <div class="flex items-center select-none shrink-0">
            <a class="inline-block mr-3 font-mono font-semibold shrink-0" href={`${base}/`}>
                <img src="favicon.png" alt="Loco Voco Logo" class="w-10">
            </a>
            <span class="text-neutral-400">|</span>
            <a class={`inline-block p-2 italic ${$page.route.id == '/edit' ? 'underline': '' }`} href={`${base}/edit`}>Chart Editor</a>
            or
            <a class={`inline-block p-2 italic ${$page.route.id == '/learn' ? 'underline': '' }`} href={`${base}/learn`}>Learn</a>
        </div>

        <div class="flex items-center gap-4 shrink-0">

            {#if file_handle_api_supported} 
                <button on:click={openFile}>Open</button>
                <button on:click={saveFile}>Save</button>
            {:else}
                <input type="file" on:input={openFile}>
                <button on:click={downloadFile}>Download</button>
            {/if}


            <div class="font-mono">
                <!-- <span class="font-bold text-red-600">{has_unsaved_changes? "": "*"}</span> -->{$voci_file.file_handle ? $voci_file.file_handle.name : "New File"}
            </div>
        </div>
    </div>
    
    <div class="flex flex-col overflow-auto grow">
        <slot></slot>
    </div>
</div>