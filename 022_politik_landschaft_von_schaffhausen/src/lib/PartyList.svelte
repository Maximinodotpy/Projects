<script lang="ts">
    import { partieslistData } from "$lib";
</script>

<div class="flex flex-col items-start">
    {#each $partieslistData as party}
        <a href="partei?p={party}">{party}</a>
    {/each}
</div>