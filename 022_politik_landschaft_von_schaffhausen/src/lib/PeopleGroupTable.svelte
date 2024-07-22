<script lang="ts">
    import type { GroupData } from "$lib";

    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';

    import PeopleTable from "./PeopleTable.svelte";

    export let data: GroupData;
</script>

<h2 class="uppercase tracking-widest mb-8">
    <a href="{data.source}" target="_blank">{data.name}</a>
    ({data?.type} auf {data?.layer} Ebene) ({data?.people?.length} Personen)
</h2>

<PeopleTable data={data?.people} />