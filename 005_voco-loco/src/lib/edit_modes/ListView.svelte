<script lang="ts">
    import SingleViewButton from "./SingleViewButton.svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import VirtualList from "@sveltejs/svelte-virtual-list";

    const voci_file = getContext<Writable<VocabularyFile>>("voci_file");

    $: grid_template_class = `grid-template-columns: repeat(${4 + $voci_file.languages.length}, minmax(0, 1fr));`;
</script>


<div class="flex flex-col h-full overflow-hidden grow">
    <div style={grid_template_class} class="grid items-center border-b-normal">
        <div class="p-2">Created</div>
        <div class="py-2">#</div>
        {#each $voci_file.languages as lang}
            <div class="py-2">{lang}</div>
        {/each}
        <div>Tags</div>
        <div class="p-0">🧨</div>
    </div>
    
    <div class="overflow-auto grow">
        <VirtualList items={$voci_file.words} let:item>
            <!-- this will be rendered for each currently visible item -->
            {@const index = $voci_file.words.indexOf(item)}
        
            <div style={grid_template_class} class="grid items-center w-full border-b-normal">
                <div class="px-2">{new Date(item.created ?? 0).toLocaleString()}</div>
                <div class="py-2 text-left">
                    {index + 1}
                    <SingleViewButton uuid={item.uuid} />
                </div>
                {#each $voci_file.languages as lang}
                    <div>
                        {#if lang in item.translations}
                            <input
                                type="text"
                                value={item.translations[lang]}
                                on:input={(ev) => {
                                    item.translations[lang] = ev.target.value;
                                }}
                                class="w-full py-2 bg-transparent focus:outline-none"
                            />
                        {/if}
                    </div>
                {/each}
        
                <div>
                    {#each item.tags as tag}
                        <span class="text-xs">
                            {tag}
                        </span>
                    {/each}
                </div>
        
                <div>
                    <button
                        on:click={() => {
                            $voci_file.removeWord(index);
                        }}>❌</button
                    >
                </div>
            </div>
        </VirtualList>
        <!-- {$voci_file.words.length} -->
    </div>
</div>