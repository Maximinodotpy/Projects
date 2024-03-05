<script lang="ts">
    import hljs from 'highlight.js';
    import { share_links } from '../stores';
    import CopyButton from '../Copy-Button.svelte';
    import { createPersistentStore } from '../stores';
    import { onMount } from 'svelte';

    let generated_html = '';

    let add_target_blank = createPersistentStore('add_target_blank', false);
    let add_image = createPersistentStore('add_image', false);
    let image_size = createPersistentStore('image_size', 50);
    let in_corporate_color = createPersistentStore('in_corporate_color', false);

    $: {
        generated_html = '';
        $share_links.forEach((SoMe) => {
            let content = $add_image && SoMe.logo ? `
    <img src="${SoMe.logo}" width="${$image_size}" alt="${SoMe.name}" />
` : SoMe.name;

            generated_html += /* html */`<a href="${SoMe.composed_url}"${ $add_target_blank ? ` target="_blank"` : ''}${$in_corporate_color ? ` style="color: ${SoMe.color}"` : ''}>${content}</a>
`;
        });

        let output = document.getElementById('output');
        if (output) {
            output.innerHTML = generated_html;
        }
    }

    onMount(() => {
        let output = document.getElementById('output');
        if (output) {
            output.innerHTML = generated_html;
        }
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
</svelte:head>

<div class="flex flex-col h-full">
    <div class="flex gap-2 p-4 text-xs">
        <CopyButton text={generated_html} />

        <label for="target_new" class="flex items-center gap-4 whitespace-nowrap button shrink-0">
            <div>Add <code>{@html hljs.highlightAuto('target="_blank"').value }</code></div>

            <input type="checkbox" id="target_new" class="p-2 bg-neutral-800" bind:checked={$add_target_blank} />
        </label>

        {#if !$add_image}    
            <label for="incorporate_color" class="flex items-center gap-4 whitespace-nowrap button shrink-0">
                <div>In Corporate color</div>

                <input type="checkbox" id="incorporate_color" class="p-2 bg-neutral-800" bind:checked={$in_corporate_color} />
            </label>
        {/if}

        {#if !$in_corporate_color}
            <label for="add_image" class="flex items-center gap-4 whitespace-nowrap button shrink-0">
                <div>Add <code>{@html hljs.highlightAuto('<img>').value }</code> with logo</div>

                <input type="checkbox" id="add_image" class="p-2 bg-neutral-800" bind:checked={$add_image} />
            </label>
        {/if}

        {#if $add_image}
            <label for="image_size" class="flex items-center gap-2 whitespace-nowrap button shrink-0">
                <div>Image size</div>

                <input type="range" id="image_size" class="bg-neutral-800" bind:value={$image_size} min="10" max="100" />
                <code>{@html hljs.highlight(`${$image_size}px`, { language: 'css' }).value }</code>
            </label>
        {/if}
    </div>

    <div class="px-4 pb-4 text-xs grow">
        <pre>{@html hljs.highlight(
            generated_html,
            { language: 'html' }
        ).value }</pre>
    </div>

    <div class="p-4 bg-neutral-800">
        <div class="mb-3">Rendered HTML Output</div>
        <div id="output" class="flex items-center gap-2"></div>
    </div>
</div>