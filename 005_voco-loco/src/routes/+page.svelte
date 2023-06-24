<script lang="ts">
    import { base } from "$app/paths";
    import type { VociFile } from "$lib/edit_modes/word_type";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    const voci_file = getContext<Writable<VociFile>>("voci_file");
</script>

<div class="flex flex-col h-full">
    
</div>