<script lang="ts">
    import { page } from "$app/stores";
    import { globalData } from "$lib/index";
    import PeopleTable from "$lib/PeopleGroupTable.svelte";
    import type { GroupData } from "$lib/index";

    let groupName = $page.url.searchParams.get("g") as string;

    let group: GroupData;

    $: {
        group = $globalData[groupName];
    }
</script>

<h1 class="uppercase tracking-widest text-4xl mb-8">{groupName}</h1>

{#if group}
    <PeopleTable data={group} />
{:else}
    <div>Loading...</div>
{/if}