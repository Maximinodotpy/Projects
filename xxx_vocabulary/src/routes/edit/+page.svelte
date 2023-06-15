<script lang="ts">
    /* import rawData from '../lib/vocabulary.json'; */

    interface Word {
        type: string;
        description: string;
        tags: string[];
        translations: {
            [key: string]: string;
        };
    }

    let words: Word[] = [];
    let lastSavedWords: Word[] = [];

    let languages = ["de", "en", "es"];
    let tags = ["Other", "Food", "Work", "Clothing", "Hobbies", "Family"];
    let autoSaveIntervalID = 0;

    function addWord() {
        // Loop through languages and add empty word to each language
        let newWord: Word = {
            type: "",
            description: "",
            tags: [],
            translations: {},
        };
        for (let i = 0; i < languages.length; i++) {
            newWord.translations[languages[i]] = "";
        }
        words.push(newWord);

        words = words;
    }

    function removeWord(id: number) {
        words.splice(id, 1);

        words = words;
    }

    let fileHandle: FileSystemFileHandle | null = null;

    async function openFile() {
        // @ts-ignore
        [fileHandle] = await window.showOpenFilePicker();

        // @ts-ignore
        const file: Blob = await fileHandle.getFile();

        words = await file.text().then(JSON.parse);
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
</script>

<div class="flex justify-between bg-neutral-200">
    <h1 class="p-4">Edit Vocabulary Chart</h1>

    <div class="p-4 font-mono">
        {fileHandle ? fileHandle.name : "Unsaved File"}

        <span class="inline-block">
            {JSON.stringify(words) == JSON.stringify(lastSavedWords)
                ? "(Up To Date)"
                : "(Unsaved Changes)"}
        </span>
    </div>
</div>

<div class="p-4">
    <div class="flex gap-5">
        <button on:click={openFile}>Open</button>
        <button on:click={saveFile}>Save</button>

        <button on:click={addWord}>Add New Word</button>
    </div>
</div>

<table class="w-full bg-blue-200 text-blue-950">
    <thead class="sticky top-0 bg-blue-100 shadow-lg">
        <tr class="text-left">
            <th class="p-2 text-center">#</th>
            {#each languages as language}
                <th class="p-2">{language}</th>
            {/each}
            <th>Tags</th>
            <th class="p-0">🧨</th>
        </tr>
    </thead>
    <tbody class="divide-y-2 divide-blue-300">
        {#each words as word, index}
            <tr class="group">
                <td class="text-center p-2">{index + 1}</td>
                {#each languages as lang}
                    <td>
                        {#if lang in word.translations}
                            <input
                                type="text"
                                bind:value={word.translations[lang]}
                                class="w-full bg-transparent focus:outline-none p-2"
                            />
                        {/if}
                    </td>
                {/each}

                <td
                    class="relative w-32 overflow-hidden group-hover:overflow-visible group-focus-within:overflow-visible"
                >
                    <select
                        multiple
                        bind:value={word.tags}
                        class="
                        bg-transparent hidden top-0 w-full p-2
                        group-focus-within:block group-focus-within:bg-white group-focus-within:shadow-lg
                        group-hover:block group-hover:bg-white group-hover:shadow-lg
                        focus:outline-none absolute "
                    >
                        {#each tags as tag}
                            <option value={tag}>{tag}</option>
                        {/each}
                    </select>

                    <div class="group-hover:hidden group-focus-within:hidden z-30">
                        {#each word.tags as tag}
                            <span class="text-xs">
                                {tag}
                            </span>
                        {/each}
                    </div>
                </td>

                <td
                    ><button
                        on:click={() => {
                            removeWord(index);
                        }}>Remove</button
                    ></td
                ><td /></tr
            >
        {/each}

        <tr>
            <td colspan={languages.length + 2}>
                <button on:click={addWord} class="p-2">Add New</button>
            </td>
        </tr>
    </tbody>
</table>
