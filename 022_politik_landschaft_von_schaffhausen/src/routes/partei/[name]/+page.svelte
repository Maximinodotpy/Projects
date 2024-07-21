<script lang="ts">
    // Get the name of the gemeinde which is in the url
    import { page } from "$app/stores";

    import { allPeopleGroupedByParty, partiesMatchedWithWhereTheyAreRepresentedLegaslitativaly, partiesMatchedWithWhereTheyAreRepresentedExekutivaly } from "$lib/index";

    import PeopleTable from "$lib/PeopleTable.svelte";
    import CommunityList from "$lib/communityList.svelte";

    let thisParty = $allPeopleGroupedByParty[$page.params.name];
    let party = $page.params.name;
</script>

<div>Partei</div>
<h1 class="uppercase tracking-widest text-4xl mb-8">{$page.params.name}</h1>

<div class="mb-20">
    <h2 class="tracking-widest text-2xl mb-4">Alle Personen in dieser Partei ({thisParty.length})</h2>

    <PeopleTable data={thisParty} />
</div>

<div class="grid grid-cols-2 gap-4">
    <div class="mb-20">
        <h2 class="tracking-widest text-2xl mb-4">Vertreten in Folgenden Exekutiven</h2>
    
        <CommunityList communities={$partiesMatchedWithWhereTheyAreRepresentedExekutivaly[party]} />
    </div>
    
    <div class="mb-20">
        <h2 class="tracking-widest text-2xl mb-4">Vertreten in Folgenden Legislativen</h2>
    
        <CommunityList communities={$partiesMatchedWithWhereTheyAreRepresentedLegaslitativaly[party]} />
    </div>
</div>
