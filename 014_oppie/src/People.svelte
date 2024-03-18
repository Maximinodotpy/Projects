<script lang="ts">
    import { people } from "./people-data";
    import { createPersistentStore } from "./stores";
    import moment from "moment";

    const date_format = 'D.M.YYYY'

    const coverImages = createPersistentStore("coverImages", true);

</script>

<div id="people" class="pt-20 text-white bg-neutral-900">

    
    <div class="p-8">
        <div class="container">
            <h2 class="mb-4 text-5xl">People</h2>
            <p class="text-lg">This is a list of people who were involved in the development of the atomic bomb.</p>
    
            <label for="coverImages" class="inline-flex items-center gap-3 mt-4 btn-dark">
                Cover images
                <input type="checkbox" bind:checked={$coverImages} id="coverImages">
            </label>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 lg:grid-cols-3">
        {#each people as person}
        <div class="p-4 rounded-lg shadow-lg bg-neutral-800">
            <div class="mb-6">
                <h3 class="mb-3">{person.first_name} {person.last_name}</h3>
                <p>* { moment(person.birth_date).format(date_format) } <span class="opacity-50">/</span> † {moment(person.death_date).format(date_format)}</p>
            </div>
            <!-- <p>{person.}</p> -->
            <!-- Loop  over pictures -->
            <div class="grid grid-cols-2 gap-4">
                {#each person.real_pictures ?? [] as picture}
                    <div class="{(person.real_pictures?.length ?? 0) % 2 == 1 ? 'last:col-span-2': ''}">
                        <img src={picture.url} alt={picture.alt} class="w-full h-48 mb-2 {$coverImages ? 'object-cover': 'object-contain'} rounded-lg">
                        <p class="overflow-hidden text-sm whitespace-nowrap text-ellipsis">{ picture.alt }</p>
                    </div>
                {/each}
            </div>
        </div>
        {/each}
    </div>

</div>