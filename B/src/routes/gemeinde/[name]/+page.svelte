<script lang="ts">
    // Get the name of the gemeinde which is in the url
    import { page } from "$app/stores";

    import { globalData } from "$lib/index";
    import type { Data, GroupData } from "$lib/index";

    import PeopleTable from "$lib/PeopleGroupTable.svelte";
    import { onMount } from "svelte";

    // Get all groups in this gemeinde¨
    let groups: GroupData[] = []

    onMount(async () => {
        console.log("Gemeinde mounted");

        // Get the name of the gemeinde
        let name = $page.params.name;

        // Get the groups in this gemeinde
        groups = Object.values($globalData)

        groups = groups.filter(group => group.place == name);
    });
</script>

<h1 class="uppercase tracking-widest text-4xl mb-8">{$page.params.name}</h1>

{#each groups as group}
    <div class="mb-20">
        <PeopleTable data={group} />
    </div>
{/each}
