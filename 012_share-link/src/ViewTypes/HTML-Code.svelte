<script lang="ts">
    import hljs from 'highlight.js';
    import { share_links } from '../stores';
    import CopyButton from '../Copy-Button.svelte';
    import { createPersistentStore } from '../stores';

    let generated_html = '';

    let add_target_blank = createPersistentStore('add_target_blank', false);

    $: {
        generated_html = '';
        $share_links.forEach((SoMe) => {
            generated_html += /* html */`<a href="${SoMe.composed_url}" ${ $add_target_blank ? `target="_blank"` : ''}>${SoMe.name}</a>
`;
        });
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
</svelte:head>

<div class="flex flex-col">
    <div class="px-4 text-xs">
        <pre>{@html hljs.highlight(
            generated_html,
            { language: 'html' }
        ).value }</pre>
    </div>

    <div class="flex gap-4 p-4">
        <CopyButton text={generated_html} />

        <label for="target_new" class="flex items-center gap-4 whitespace-nowrap button">
            <div>Add <code>{@html hljs.highlightAuto('target="_blank"').value }</code></div>

            <input type="checkbox" id="target_new" class="p-2 bg-neutral-800" bind:checked={$add_target_blank} />
        </label>
    </div>
</div>