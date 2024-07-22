<script lang="ts">
    export let communities: string[] = [];
    import  { base } from '$app/paths';
</script>

<ul>
    {#each communities as community}
        <li>
            <a href="{base}/gemeinde?g={community}">{community}</a>
        </li>
    {:else}
        <li>Keine Gemeinden gefunden</li>
    {/each}
</ul>