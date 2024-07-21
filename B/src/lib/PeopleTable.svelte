<script lang="ts">
    import type { PersonData } from "$lib";

    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';

    export let data: PersonData[];

    export let searchTerm: string = '';

    $: filteredData = data.filter(person => {
        return person.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || person.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    });

    function getFemaletoMaleRatio(data: PersonData[]) {
        let male = data.filter(person => person.gender == 'M').length
        let female = data.filter(person => person.gender == 'F').length

        return {
            male, female, ratio: female/male, count: data.length
        }
    }

</script>

<TableSearch placeholder="Suchen" hoverable={true} bind:inputValue={searchTerm} divClass="border">
    <!-- <caption class="px-5 pb-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        Our products
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
    </caption> -->
    <TableHead>
        <TableHeadCell>Vorname</TableHeadCell>
        <TableHeadCell>Nachname</TableHeadCell>
        <TableHeadCell>Partei</TableHeadCell>
        <TableHeadCell>Geburtsjahr</TableHeadCell>
        <TableHeadCell>Aufgaben</TableHeadCell>
        <TableHeadCell>Seit</TableHeadCell>
        <TableHeadCell>Bild</TableHeadCell>
        <TableHeadCell>G</TableHeadCell>
    </TableHead>
    <TableBody>
        {#each filteredData as person}
            <TableBodyRow>
                <TableBodyCell>{person.firstname ?? ''}</TableBodyCell>
                <TableBodyCell>{person.lastname ?? ''}</TableBodyCell>
                <TableBodyCell>
                    <a href="{person.party}">{person.party ?? ''}</a>
                </TableBodyCell>
                <TableBodyCell>{person.birthyear ?? ''}</TableBodyCell>
                <TableBodyCell>{person.tasks ?? ''}</TableBodyCell>
                <TableBodyCell>{person.since ?? ''}</TableBodyCell>
                <TableBodyCell>
                    <a href="{person.image}" target="_blank" class="text-xs">
                        <img src={person.image} width="70" alt={person.firstname + " " + person.lastname} />
                    </a>
                </TableBodyCell>
                <TableBodyCell>{person.gender ?? ''}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</TableSearch>