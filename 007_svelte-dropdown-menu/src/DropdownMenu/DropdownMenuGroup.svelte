<script lang="ts">
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    const current_panel = writable("null");

    setContext("current_menu", current_panel);
</script>

<slot />
