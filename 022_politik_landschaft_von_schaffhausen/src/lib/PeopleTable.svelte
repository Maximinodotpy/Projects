<script lang="ts">
    import type { PersonData } from "$lib";
    import  { base } from '$app/paths';
    import {
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch
    } from 'flowbite-svelte';

    export let data: PersonData[];
    export let searchTerm: string = '';
    export let hideParty: boolean = false;
    export let hidePlace: boolean = true;
    
    $: femaleToMaleRatio = getFemaletoMaleRatio(data);
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
    <caption class="px-5 pb-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        Infos zu dieser Tabelle
        <div class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            <ul class="grid grid-cols-6">
                <li>{femaleToMaleRatio.male} Männer</li>
                <li>{femaleToMaleRatio.female} Frauen</li>
                <li>{Math.round(femaleToMaleRatio.female/femaleToMaleRatio.count*100)}% Frauen</li>
            </ul>
        </div>
    </caption>
    <TableHead>
        <TableHeadCell>Vorname</TableHeadCell>
        <TableHeadCell>Nachname</TableHeadCell>
        <TableHeadCell class="{hideParty ? 'hidden': ''}">Partei</TableHeadCell>
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
                <TableBodyCell class="{hideParty ? 'hidden': ''}">
                    <a href="{base}/partei?p={person.party}">{person.party ?? ''}</a>
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