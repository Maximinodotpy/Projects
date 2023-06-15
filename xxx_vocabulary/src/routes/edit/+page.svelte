<script lang="ts">
    /* import rawData from '../lib/vocabulary.json'; */


    interface Word {
        type: string;
        description: string;
        translations: {
            [key: string]: string;
        }
    }

    let words: Word[] = [];
    let lastSavedWords: Word[] = [];

    let languages = [ 'de', 'en', 'es' ];

    function addWord() {
        // Loop through languages and add empty word to each language
        let newWord: Word = {
            type: '',
            description: '',
            translations: {},
        }
        for (let i = 0; i < languages.length; i++) {
            newWord.translations[languages[i]] = '';
        }
        words.push(newWord);

        words = words;
    }

    function removeWord(id: number) {
        words.splice(id, 1);

        words = words;
    }


    let fileHandle : FileSystemFileHandle | null = null;

    async function openFile() {
        // @ts-ignore
        [fileHandle] = await window.showOpenFilePicker();

        // @ts-ignore
        const file: Blob = await fileHandle.getFile();

        words = await file.text().then(JSON.parse);
        lastSavedWords = JSON.parse(JSON.stringify(words));
    }

    async function saveFile() {
        if (!fileHandle) {
            saveFileAs();
            return;
        };

        // @ts-ignore
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(words, null, 4));
        await writable.close();

        lastSavedWords = JSON.parse(JSON.stringify(words));
    }

    async function saveFileAs() {
        // @ts-ignore
        [fileHandle] = await window.showSaveFilePicker();

        // @ts-ignore
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(words, null, 4));
        await writable.close();

        lastSavedWords = JSON.parse(JSON.stringify(words));
    }
</script>

<h1>Edit Vocabulary Chart</h1>

<div>
    Editing { fileHandle ? fileHandle.name : 'no file selected' } { JSON.stringify(words) == JSON.stringify(lastSavedWords) ? '(Up To Date)' : '(Unsaved Changes)' }
</div>

<button on:click={openFile}>Open</button>
<button on:click={saveFile}>Save</button>

<button on:click={addWord}>Add New</button>

<table>
    <thead>
        <tr>
            <th>#</th>
            {#each languages as language}
                <th>{language}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each words as word, index}
            <tr>
                <td>{index}</td>
                {#each languages as lang}
                    <td>    
                        {#if lang in word.translations}
                            <input type="text" bind:value={word.translations[lang]}>
                        {/if}
                    </td>
                {/each}

                <td>
                    <button on:click={() => { removeWord(index) }}>Remove</button>
                <td>
            </tr>
        {/each}

        <tr>
            <td colspan={languages.length}>
                <button on:click={addWord}>Add New</button>
            </td>
        </tr>
    </tbody>
</table>