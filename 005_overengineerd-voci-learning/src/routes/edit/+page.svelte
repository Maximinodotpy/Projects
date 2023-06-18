<script lang="ts">
    import type { Word } from "$lib/edit_modes/word_type";
    import SingleView from "$lib/edit_modes/SingleView.svelte";
    import ListView from "$lib/edit_modes/ListView.svelte";
    import GroupedByTags from "$lib/edit_modes/GroupedByTags.svelte";
    import { languages } from "$lib/edit_modes/variables";

    let words: Word[] = [];
    let lastSavedWords: Word[] = [];

    $: has_unsaved_changes = JSON.stringify(words) == JSON.stringify(lastSavedWords);

    const view_modes = [
        ['List', ListView ],
        ['Single', SingleView ],
        ['Grouped By Tags', GroupedByTags ],
    ]
    let current_view_mode = 0
    let autoSaveIntervalID = 0;

    let fileHandle: FileSystemFileHandle | null = null;

    function addWord() {
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
        words.push(newWord);

        words = words;
    }

    function removeWord(id: number) {
        if (words.length == 1) return;
        
        words.splice(id, 1);

        words = words;
    }

    async function openFile() {
        // @ts-ignore
        [fileHandle] = await window.showOpenFilePicker();

        // @ts-ignore
        const file: Blob = await fileHandle.getFile();

        words = await file.text().then(JSON.parse);
        // Loop over words and add a uuid to each word if it does not have one
        for (let i = 0; i < words.length; i++) {
            if (!words[i].uuid) {
                words[i].uuid = crypto.randomUUID();
            }
        }
        lastSavedWords = JSON.parse(JSON.stringify(words));

        autoSaveIntervalID = setInterval(() => {
            if (JSON.stringify(words) != JSON.stringify(lastSavedWords)) {
                console.log("Autosaving...");

                saveFile();
            }
        }, 1000 * 15);
    }

    async function saveFile() {
        if (!fileHandle) {
            saveFileAs();
            return;
        }

        // @ts-ignore
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(words, null, 4));
        await writable.close();

        lastSavedWords = JSON.parse(JSON.stringify(words));
    }

    async function saveFileAs() {
        // @ts-ignore
        fileHandle = await window.showSaveFilePicker();

        // @ts-ignore
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(words, null, 4));
        await writable.close();

        lastSavedWords = JSON.parse(JSON.stringify(words));
    }

    addWord();
    lastSavedWords = JSON.parse(JSON.stringify(words));
</script>

<div class="flex justify-between border-b-[1.5px] px-4 py-3 items-center">
    <div class="flex gap-5">
        <button on:click={openFile}>Open</button>
        <button on:click={saveFile}>Save</button>

        <button on:click={addWord}>Add New Word</button>

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
    
    <div class="font-mono">
        <span class="font-bold text-red-600">{has_unsaved_changes? "": "*"}</span>{fileHandle ? fileHandle.name : "New File"}
    </div>
</div>

<div>
    <svelte:component this={view_modes[current_view_mode][1]} bind:words={words} removeWord={removeWord} />
</div>

