<script lang=ts>
    export let text = 'My message';
    export let id = '';
    export let label = 'Title text';

    export let row_count = 1;
</script>

<label for={id} class="relative block pt-10">
    
    {#if row_count > 1}
        <textarea id={id} bind:value={text} class="z-0 p-2 bg-neutral-800 button peer" required rows={row_count}></textarea>
    {/if}

    {#if row_count == 1}
        <input type="text" id={id} bind:value={text} class="z-0 p-2 bg-neutral-800 button peer" required />
    {/if}

    <div class="absolute z-10 p-2 px-4 transition-all top-10 peer-valid:top-0 peer-valid:px-0 peer-focus:top-0 peer-focus:px-0">{label}</div>
</label>