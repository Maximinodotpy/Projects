<script lang="ts">
    import { getContext } from "svelte";
    import type { VociFile } from '$lib/edit_modes/word_type';
    import { tags } from '$lib/edit_modes/variables';
    import { option_values } from "./options";
    import type { Writable } from "svelte/store";

    const voci_file = getContext<Writable<VociFile>>("voci_file");

    $option_values.target_language = $voci_file.languages[0];
    $option_values.origin_language = $voci_file.languages[1];

    let options_visible = false;

    let current_width = 0;

    function swapTargetAndOriginLangauge() {
        const temp = $option_values.target_language;
        $option_values.target_language = $option_values.origin_language;
        $option_values.origin_language = temp;
    }

    $: {
        let temp_pool = $voci_file.words.filter(word => {            
            if ($option_values.allowed_tags.length == 0) {
                return true;
            } else {
                return word.tags.some(tag => $option_values.allowed_tags.includes(tag));
            }
        })

        $option_values.word_pool = temp_pool.length == 0 ? $voci_file.words : temp_pool;
    }
</script>

<div class="flex divide-x-[1.5px] h-full overflow-x-hidden" bind:clientWidth={current_width}>
    {#if current_width < 640}
        <button class="grid px-3 place-content-center hover:cursor-pointer" style="writing-mode: vertical-lr; text-orientation: mixed;" on:click={ () => { options_visible = !options_visible } }>
            <span class="inline-block rotate-180" >
                {#if options_visible}
                    Learn
                {:else}
                    Options
                {/if}
            </span>
        </button>
    {/if}

    {#if options_visible || current_width >= 640}
        <div class={`px-4 py-2 overflow-auto`} style={`width: ${current_width < 640 ? '100%' : '320px' }`}>
            <h2 class="mb-5 text-2xl">Options</h2>

            <div class="mb-5">
                <h3 class="mb-3 text-xl">Tags</h3>

                <div class="my-3 mb-5 text-xs">
                    {$option_values.word_pool.length} words in pool
                </div>

                <div class="grid grid-cols-3 gap-2">
                    {#each tags as tag}
                        <label for={tag} class="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 rounded-md">
                            <input bind:group={$option_values.allowed_tags} type="checkbox" value={tag} id={tag}>
                            {tag}
                        </label>
                    {/each}
                </div>
            </div>

            <div class="mb-7">
                <h3 class="mb-3 text-xl">Target and Origin Language</h3>

                <div>
                    <label for="" class="flex items-center gap-3 mb-3">
                        <span>Origin</span>
                        
                        <select bind:value={$option_values.origin_language} class="px-2 py-1 bg-blue-100 rounded-md">
                            {#each $voci_file.languages as language}
                                {#if language != $option_values.target_language}
                                    <option value={language}>{language}</option>
                                {/if}
                            {/each}
                        </select>
                    </label>

                    <label for="" class="flex items-center gap-3">
                        <span>Target</span>

                        <select bind:value={$option_values.target_language} class="px-2 py-1 bg-blue-100 rounded-md">
                            {#each $voci_file.languages as language}
                                {#if language != $option_values.origin_language}
                                    <option value={language}>{language}</option>
                                {/if}
                            {/each}
                        </select>
                    </label>

                    <button on:click={ swapTargetAndOriginLangauge } class="mt-2">Swap Target and Origin</button>
                    
                    <!-- {#if text_to_speech}
                        <label for="ottsl" class="flex items-center gap-3">
                            <span>Origin TTS Language</span>
                            
                            <select name="" class="max-w-[200px] px-2 py-1 bg-blue-100 rounded-md" id="ottsl">
                                {#each speechSynthesis.getVoices() as voice}
                                    <option value={voice.lang}>{voice.name}</option>
                                {/each}
                            </select>
                        </label>
                    {/if} -->
                </div>
            </div>

            
            <!-- <div class="mb-3">
                <h3 class="mb-3 text-xl">TTS</h3>

                <label for="tts" class="flex items-center gap-2">
                    <input bind:checked={text_to_speech} type="checkbox" id="tts">
                    <span>Text to Speech</span>
                </label>
            </div> -->
        </div>
    {/if}
    
    {#if !options_visible || current_width >= 640}
        <div class="flex flex-col overflow-hidden grow">
            <slot></slot>
        </div>
    {/if}
</div>