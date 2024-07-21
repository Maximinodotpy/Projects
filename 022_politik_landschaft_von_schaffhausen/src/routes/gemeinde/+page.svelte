<script lang="ts">
    // Get the name of the gemeinde which is in the url
    import { page } from "$app/stores";

    import { globalData } from "$lib/index";
    import type { Data, GroupData } from "$lib/index";

    import PeopleTable from "$lib/PeopleGroupTable.svelte";
    import { onMount } from "svelte";

    // Get all groups in this gemeinde¨
    let groups: GroupData[] = []

    let gemeindeName = $page.url.searchParams.get("g") as string;;

    onMount(async () => {
        console.log("Gemeinde mounted");

        // Get the groups in this gemeinde
        groups = Object.values($globalData)

        groups = groups.filter(group => group.place == gemeindeName);
    });

    console.log($page);
</script>

<h1 class="uppercase tracking-widest text-4xl mb-8">{gemeindeName}</h1>

{#each groups as group}
    <div class="mb-20">
        <PeopleTable data={group} />
    </div>
{/each}
