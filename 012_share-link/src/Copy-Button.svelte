<script lang="ts">
    export let text = 'Hello, world!';

    export let label = 'Copy';

    function copy () {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard: ' + text);
    }
</script>

<!-- A button to copy a text to the clip board -->
<button class="button" on:pointerdown={copy}>{ label }</button>