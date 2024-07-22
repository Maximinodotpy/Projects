<script lang="ts">
    import { gemeindenlistData, exikutivenlistData, legislativenlistData, allPeopleGroupedByParty, allPeople, partieslistData, selectedDate } from "$lib";

    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';

    import CommunityList from "$lib/CommunityList.svelte";

    import PartyList from "$lib/PartyList.svelte";
    import moment from "moment";
</script>

<div class="mb-8">
    <p class="mb-4">Auf dieser Website finden sie Informationen zu den Mandatsträgerinnen und Trägern der Kommunal und Kantonal Ebenen in der Exekutive und Legislative im Kanton Schaffhausen. Die Daten sind von den Websiten der Gemeinden und werden hier gebündelt in dieser <a href="/Data/Daten_{$selectedDate}.xlsx" target="_blank">Excel Datei</a>.</p>
    <div>
        <p class="mb-2">Notizen zu den Daten</p>

        <ul class="list-disc list-inside">
            <li>Stichtag der Daten ist der { moment($selectedDate).format('DD. MMMM YYYY') }. Man kann aber oben rechts auch einen anderen Tag auswählen.</li>
            <li>Die Bilder wurden nur entnommen wenn sie nicht als Data URL eingebettet waren.</li>
            <li>Die Daten entstammen den Websiten der Gemeinden und es wurde nur das Geschlecht der jeweiligen Personen angenommen. Falls keine Partei genannt wurde, findet man diese Info auch nicht hier.</li>
        </ul>
    </div>
</div>

<div class="grid grid-cols-2 md:grid-cols-4 gap-y-6">
    <div>
        <h2 class="font-bold">Gemeinden</h2>

        <!-- Loop over all Groups and create a link -->
        <CommunityList communities={Object.values($gemeindenlistData)} />
    </div>
    
    <div>
        <h2 class="font-bold">Parteien</h2>

        <!-- Show a list of all parties -->
        <PartyList />
    </div>

    <!-- <div>
        <h2 class="font-bold">Gruppierungen</h2>

        <div class="flex flex-col items-start">
            {#each Object.values($globalData) as group}
                <a href="gruppierung/{group.name}">{group.name}</a>
            {/each}
        </div>
    </div> -->
    
    <div>
        <h2 class="font-bold">Legislativen</h2>

        <!-- Loop over all Groups and create a link -->
        <div class="flex flex-col items-start">
            {#each $legislativenlistData as legislative}
                <a href="gruppierung?g={legislative}">{legislative}</a>
            {/each}
        </div>
    </div>
    
    <div>
        <h2 class="font-bold">Exekutiven</h2>

        <!-- Loop over all Groups and create a link -->
        <div class="flex flex-col items-start">
            {#each $exikutivenlistData as exekutive}
                <a href="gruppierung?g={exekutive}">{exekutive}</a>
            {/each}
        </div>
    </div>

    <!-- Loop over all parties and then show all people within -->
    <!-- {#each Object.keys($allPeopleGroupedByParty) as partyName}
        <div>
            <h2 class="font-bold">{partyName}</h2>

            <div class="flex flex-col items-start">
                {#each $allPeopleGroupedByParty[partyName] as person}
                    <a href="person/{person.firstname}{person.lastname}">{person.firstname} {person.lastname}</a>
                {/each}
            </div>
        </div>
    {/each} -->
</div>

<div class="mt-20">
    <div class="text-xl text-center">
        <div class="inline font-bold">{ $allPeople.length }</div> Personen in <div class="inline font-bold">{$gemeindenlistData.length}</div> Gemeinden und <div class="inline font-bold">{$partieslistData.length}</div> Parteien.
        
        Davon sind <div class="inline font-bold">{$allPeople.filter(person => person.gender == 'M').length}</div> Männlich und <div class="inline font-bold">{$allPeople.filter(person => person.gender == 'F').length}</div> Weiblich.
    </div>

    <div class="my-20">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Karte_Gemeinden_des_Kantons_Schaffhausen_farbig_2013.png" alt="">
    </div>
</div>

<div class="mt-20 mb-80">
    <h3 class="text-xl tracking-widest mb-8">Informationsstatus</h3>

    <Table divClass="border">
        <TableHead>
            <TableHeadCell>Was</TableHeadCell>
            <TableHeadCell>Wie viel</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
            <TableBodyRow>
                <TableBodyCell>Parteien</TableBodyCell>
                <TableBodyCell>
                    {$allPeople.filter(person => person.party).length}
                    <div class="opacity-50 inline-block">
                        von
                        {$allPeople.length}
                    </div>
                </TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell>Geburtsjahre</TableBodyCell>
                <TableBodyCell>
                    {$allPeople.filter(person => person.birthyear).length}
                    <div class="opacity-50 inline-block">
                        von
                        {$allPeople.length}
                    </div>
                </TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell>Seit Angaben</TableBodyCell>
                <TableBodyCell>
                    {$allPeople.filter(person => person.since).length}
                    <div class="opacity-50 inline-block">
                        von
                        {$allPeople.length}
                    </div>
                </TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell>Geschlechts Angaben</TableBodyCell>
                <TableBodyCell>
                    {$allPeople.filter(person => person.gender).length}
                    <div class="opacity-50 inline-block">
                        von
                        {$allPeople.length}
                    </div>
                </TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell>Bilder</TableBodyCell>
                <TableBodyCell>
                    {$allPeople.filter(person => person.image).length}
                    <div class="opacity-50 inline-block">
                        von
                        {$allPeople.length}
                    </div>
                </TableBodyCell>
            </TableBodyRow>
        </TableBody>
    </Table>
</div>