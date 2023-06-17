<script lang="ts">
    import { flip } from "svelte/animate";

    interface Word {
        type: string;
        description: string;
        tags: string[];
        created: number;
        uuid: string;
        translations: {
            [key: string]: string;
        };
    }

    let words: Word[] = [];
    let lastSavedWords: Word[] = [];

    let languages = ["de", "en", "es"];
    let tags = [
        "Other",
        "Food",
        "Work",
        "Clothing",
        "Hobbies",
        "Family",
        "Numbers",
        "Body",
        "Traveling",
        "Colors",
    ];
    let autoSaveIntervalID = 0;

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
        words.splice(id, 1);

        words = words;
    }

    function moveDown(id: number) {
        const temp = words[id + 1]
        words[id + 1] = words[id]
        words[id] = temp
    }
    function moveUp(id: number) {
        const temp = words[id - 1]
        words[id - 1] = words[id]
        words[id] = temp
    }

    let fileHandle: FileSystemFileHandle | null = null;

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

<table class="w-full mb-20">
    <thead class="sticky top-0 z-50 bg-blue-100 shadow-lg">
        <tr class="text-left">
            <th class="p-2 text-center"></th>
            <th class="p-2 text-center"></th>
            <th class="p-2">Created</th>
            <th class="p-2 text-center">#</th>
            {#each languages as language}
                <th class="p-2">{language}</th>
            {/each}
            <th>Tags</th>
            <th class="p-0">🧨</th>
        </tr>
    </thead>
    <tbody class="divide-y-2 divide-neutral-300">
        {#each words as word, index (word.uuid)}
            <tr class="group" animate:flip={{ duration: 200 }}>
                <td class="p-2 text-center transition-opacity opacity-25 group-hover:opacity-100">
                    {#if index != 0}
                        <button on:click={() => { moveUp(index) }}>⬆</button>
                    {/if}
                </td>
                <td class="p-2 text-center transition-opacity opacity-25 group-hover:opacity-100">
                    {#if index < words.length - 1}
                        <button on:click={() => { moveDown(index) }}>⬇</button>
                    {/if}
                </td>
                <td>{ new Date(word.created ?? 0).toLocaleString() }</td>
                <td class="p-2 text-center">{index + 1}</td>
                {#each languages as lang}
                    <td>
                        {#if lang in word.translations}
                            <input
                                type="text"
                                bind:value={word.translations[lang]}
                                class="w-full p-2 bg-transparent focus:outline-none"
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
                        class="absolute top-0 invisible w-full h-full p-2 text-xs bg-transparent bg-white group-focus-within:visible focus:outline-none focus:shadow-lg"
                    >
                        {#each tags as tag}
                            <option value={tag}>{tag}</option>
                        {/each}
                    </select>

                    <div class="">
                        {#each word.tags as tag}
                            <span class="text-xs">
                                {tag}
                            </span>
                        {/each}
                    </div>
                </td>

                <td class="transition-opacity opacity-25 group-hover:opacity-100"
                    ><button
                        on:click={() => {
                            removeWord(index);
                        }}>❌</button
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
