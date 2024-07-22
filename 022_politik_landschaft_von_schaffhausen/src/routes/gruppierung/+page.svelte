<script lang="ts">
    import { page } from "$app/stores";
    import { globalData } from "$lib/index";
    import PeopleTable from "$lib/PeopleGroupTable.svelte";
    import type { GroupData } from "$lib/index";
    import PageTitle from "$lib/PageTitle.svelte";

    let groupName = $page.url.searchParams.get("g") as string;

    let group: GroupData;

    $: {
        group = $globalData[groupName];
    }
</script>

<PageTitle title={groupName} category="Gruppierung" />

{#if group}
    <PeopleTable data={group} />
{:else}
    <div>Loading...</div>
{/if}