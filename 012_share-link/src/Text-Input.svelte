<script lang=ts>
    export let text = 'My message';
    export let id = '';
    export let label = 'Title text';
</script>

<label for={id} class="relative block pt-10">
    <input type="text" id={id} bind:value={text} class="z-0 p-2 bg-neutral-800 button peer" required />
    <div class="absolute z-10 p-2 px-4 transition-all top-10 peer-valid:top-0 peer-valid:px-0 peer-focus:top-0 peer-focus:px-0">{label}</div>
</label>