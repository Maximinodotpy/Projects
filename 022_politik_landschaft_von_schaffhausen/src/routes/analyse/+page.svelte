<script lang="ts">

    import {
        exikutivenlistData,
        globalData
    } from "$lib";

    import GroupList from "$lib/GroupList.svelte";

    import PageTitle from "$lib/PageTitle.svelte";

    const exekutivenMitNurMännern = $exikutivenlistData.filter(exekutive => {
        let people = $globalData[exekutive].people
        let onlyMen = people.every(person => {
            return person.gender == "M"
        })
        return onlyMen
    })

    const exekutivenMitNurFrauen = $exikutivenlistData.filter(exekutive => {
        let people = $globalData[exekutive].people
        let onlyWomen = people.every(person => {
            return person.gender == "F"
        })
        return onlyWomen
    })

</script>

<PageTitle title="Analyse" />

<!-- Exekutiven die nur aus Männern oder Frauen bestehen -->

<div class="grid grid-cols-3">
    <div>
        <h2 class="font-bold">Exekutiven mit nur Männern</h2>
        <GroupList groups={exekutivenMitNurMännern} />
    </div>

    <div>
        <h2 class="font-bold">Exekutiven mit nur Frauen</h2>
        <GroupList groups={exekutivenMitNurFrauen} />
    </div>
</div>

