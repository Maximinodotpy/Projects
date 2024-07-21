<script lang="ts">
    export let communities: string[] = [];
</script>

<ul>
    {#each communities as community}
        <li>
            <a href="/gemeinde/{community}">{community}</a>
        </li>
    {/each}
</ul>