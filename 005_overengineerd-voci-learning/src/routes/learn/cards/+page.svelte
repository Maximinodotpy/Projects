<script lang="ts">
    import { getContext } from "svelte";
    let words = []

    const voci_file = getContext('voci_file');
</script>

<div class="flex divide-x-[1.5px] h-full">
    <div class="flex flex-col grow">
        <div class="grid text-3xl grow place-content-center">Current Word</div>
        <input type="text" class="border-t-[1.5px] p-6 text-2xl focus:outline-none">
    </div>
    <div class="w-[400px] px-4 py-2">
        {#if words.length == 0}
            <button>Import Quiz</button>
        {:else}
            OPTIONS
        {/if}
    </div>
</div>