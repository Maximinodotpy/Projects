<script lang="ts">
    export let groups: string[] = [];
    import  { base } from '$app/paths';
</script>

<ul>
    {#each groups as group}
        <li>
            <a href="{base}/gruppierung?g={group}">{group}</a>
        </li>
    {:else}
        <li>Keine Gruppen gefunden</li>
    {/each}
</ul>