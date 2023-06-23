<script lang="ts">
    import type { Writable } from "svelte/store";
    import { getContext } from "svelte";
    import type { VociFile, Word } from "$lib/edit_modes/word_type";
    import calcJaroWincklerDistance from "./JaroWinkler";
    import SingleViewButton from "./SingleViewButton.svelte";

    const voci_file = getContext<Writable<VociFile>>("voci_file");

    let similar_words: Array<{ right: Word, left: Word }> = [];

    let jaro_winkler_threshhold = 0.95;
    let comparison_language = $voci_file.languages[0];

    $: {
        jaro_winkler_threshhold = jaro_winkler_threshhold;
        comparison_language = comparison_language;
        getSimilarWords();
    }

    function getSimilarWords() {
        // Loop over all words and in case of a match, add it to the list
        similar_words = [];
        for (const left_word of $voci_file.words) {
            for (const right_word of $voci_file.words) {
                if (left_word != right_word) {
                    const distance = calcJaroWincklerDistance(left_word.translations[comparison_language], right_word.translations[comparison_language]);
                    
                    if (distance >= jaro_winkler_threshhold) {

                        if (similar_words.some((duplicate) => duplicate.left == right_word && duplicate.right == left_word)) {
                            continue;
                        }

                        similar_words.push({ left: left_word, right: right_word });
                    }
                }
            }
        }
    }

    getSimilarWords();
</script>

<div class="flex flex-col h-full overflow-hidden">
    <div class="px-4 py-4 border-b-[1.5px] flex gap-7 overflow-auto shrink-0">
        <div class="flex gap-4 shrink-0">
            Similiarity Threshhold
            <input type="number" bind:value={jaro_winkler_threshhold} class="w-20" max="1" min="0.85" step="0.05"> 
        </div>
    
        <div class="shrink-0">
            <label for="comp_lang">
                Comparison Language
                <select bind:value={comparison_language} id="comp_lang">
                    {#each $voci_file.languages as lang, i}
                        <option value={lang}>{lang}</option>
                    {/each}
                </select>
            </label>
        </div>
    </div>
    
    <div class="w-full overflow-auto">
        <div class="max-w-3xl mx-auto">
            {#each similar_words as duplicate, i}
                <div class="grid w-full grid-cols-3 p-4">
                    <div>
                        <h2 class="text-2xl"> { duplicate.left.translations[comparison_language] }</h2>
        
                        <div>
                            {#each $voci_file.languages as lang, i}
                                {#if lang != comparison_language}
                                    <div>{lang}: {duplicate.left.translations[lang]}</div>
                                {/if}
                            {/each}
                        </div>
        
                        <div class="flex gap-5 mt-4">
                            <SingleViewButton uuid={duplicate.left.uuid} />
                        </div>
                    </div>
                    
                    <div class="p-4 font-mono">
                        VS
                    </div>
            
                    <div>
                        <h2 class="text-2xl"> { duplicate.right.translations[comparison_language] }</h2>
        
                        <div>
                            {#each $voci_file.languages as lang, i}
                                {#if lang != comparison_language}
                                    <div>{lang}: {duplicate.right.translations[lang]}</div>
                                {/if}
                            {/each}
                        </div>
        
                        <div class="flex gap-5 mt-4">
                            <SingleViewButton uuid={duplicate.right.uuid} />
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>