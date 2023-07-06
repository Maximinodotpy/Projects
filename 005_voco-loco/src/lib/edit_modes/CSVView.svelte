<script lang="ts">
    import type monaco from 'monaco-editor';
    import { onMount, onDestroy, beforeUpdate } from 'svelte';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    import type { Writable } from "svelte/store";
    import { getContext } from "svelte";

    
    let divEl: HTMLDivElement | null = null;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco;
    
    const voci_file = getContext<Writable<VocabularyFile>>("voci_file");
    
    function ArrayToCSV<T extends { [key: string]: string|number|Array<string|number> }>(array: T[]): string {
        let final_string = '';
        
        // Find all used keys and add them as column names
        const common_keys = new Set<string>();
        for ( const item of array ) {
            for ( const key of Object.keys(item) ) {
                common_keys.add(key);
            }
        }
        final_string += Array.from(common_keys).join(',');

        // Add all the lines of the array
        for ( const item of array ) {
            final_string += '\n';
            for ( const key of common_keys ) {
                if ( Array.isArray(item[key]) ) {
                    final_string += item[key].join('|') + ',';
                } else {
                    final_string += item[key] + ',';
                }
            }

            // Remove the last comma
            final_string = final_string.substring(0, final_string.length - 1);
        }


        return final_string;
    }

    function CSVToArray(csv: string) {
        // Save the column heads
        const lines = csv.split('\n');
        const column_heads = lines[0].split(',');

        // Save the data
        const data = [];
        for ( const line of lines.slice(1) ) {
            const line_parts = line.split(',');
            const line_data = {};
            for ( const [i, part] of line_parts.entries() ) {
                line_data[column_heads[i]] = part;
            }
            data.push(line_data);
        }

        return data;
    }

    function wordsToCSV() {
        // transform all our data into a format that can be used by ArrayToCSV
        const final_data = $voci_file.words.map((word) => {
            const final_word: Word = {};
            for ( const lang of $voci_file.languages ) {
                final_word[lang] = word.translations[lang];
            }
            final_word['tags'] = word.tags;
            final_word['description'] = word.description;
            final_word['uuid'] = word.uuid;
            final_word['created'] = word.created;
            
            return final_word;
        });

        /* console.log(final_data); */

        return ArrayToCSV(final_data);
    }

    function CSVToWords(string: string) {
        const parsed = CSVToArray(string);

        // transform all our data into a format that loco voco uses
        const final_data = parsed.map((word: Word) => {
            const final_word = {
                uuid: word.uuid,
                created: parseInt(word.created),
                description: word.description,
                tags: word.tags.split('|'),
                translations: {}
            };
            for ( const lang of $voci_file.languages ) {
                final_word.translations[lang] = word[lang];
            }
            return final_word;
        });

        /* console.log(parsed);
        console.log(final_data); */

        $voci_file.words = final_data;
    }

    const distpose = onDestroy(() => {
        console.log('Disposing Monaco Editor');
        editor.dispose();
    });

    onMount(async () => {
        console.log('Mounted Monaco Editor');
        
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                return new editorWorker();
            }
        };

        Monaco = await import('monaco-editor');
        if (!divEl) return
        editor = Monaco.editor.create(divEl, {
            value: wordsToCSV(),
            language: 'csv',
            theme: 'vs-dark'
        });

        // When the user changes the text, update the voci_file
        editor.onDidChangeModelContent(function (e) {
            CSVToWords(editor.getValue());
        });
        
        // Prohibit the user from changing the first line
        editor.onDidChangeCursorPosition(function (e) {
            if (e.position.lineNumber < 2) {
                editor.setPosition({
                    lineNumber: 2,
                    column: editor.getPosition()?.column || 0
                });
            }
        });

        editor.focus();

        voci_file.subscribe(() => {
            if (!editor.getDomNode()?.contains(document.activeElement)) {
                editor.setValue(wordsToCSV());
                editor.focus();
            }
        });

        return () => {
            editor.dispose();
        };
    });
</script>

<div class="flex flex-col h-full">
    <div class="p-2">DON'T CHANGE THE COLUMN NAMES HERE</div>
    <div bind:this={divEl} class="h-full" />
</div>