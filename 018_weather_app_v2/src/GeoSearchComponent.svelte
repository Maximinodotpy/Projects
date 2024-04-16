<script lang="ts">
    import { onMount } from "svelte";

    let current_search_location = "";
    let current_results = [];

    let inputElement: HTMLInputElement;
    let isActive = false;

    export let chosen_location: {
        name: string;
        lat: number;
        lon: number;
    } = {
        lat: 0,
        lon: 0,
        name: "",
    };

    onMount(() => {
        console.log("mounted");

        inputElement.onblur = () => {
            console.log("blur");
            isActive = false;
        };
        inputElement.onfocus = () => {
            console.log("focus");

            setTimeout(() => {
                isActive = true;
            }, 100);
        };
    });

    async function searchLocation() {
        /* const url = `https://api.open-meteo.com/v1/geo?location=${current_search_location}`; */
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${current_search_location}&count=10&language=en&format=json`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                current_results = data.results;
            });
    }

    $: if (current_search_location.length > 2) {
        searchLocation();
    }
</script>

<div class="flex flex-col relative">

    <!-- svelte-ignore a11y-accesskey -->
    <input
        type="text"
        class="p-2 border-b-2 border-neutral-200 w-full block text-xl bg-neutral-900/10 focus:outline-none placeholder:text-neutral-900"
        placeholder="Search"
        bind:value={current_search_location}
        bind:this={inputElement}
        accesskey="s"
    />

    <div
        class="overflow-auto absolute h-48 shadow-md top-full bg-neutral-900/80 w-full transition-all {isActive
            ? ''
            : 'opacity-0 pointer-events-none'}"
    >
        {#if current_results.length > 0}
            <ul>
                {#each current_results as result}
                    <li class="" >
                        <button
                            class="p-2 border-b-2 border-neutral-900/10 hover:bg-neutral-900/30 transition-all w-full text-left"
                            on:pointerdown={() => {
                                current_search_location = result.name;

                                chosen_location = {
                                    lat: result.latitude,
                                    lon: result.longitude,
                                    name: result.name,
                                };
                            }}
                        >
                            {result.name} in {result.country}
                        </button>
                    </li>
                {/each}
            </ul>
        {:else}
            <div class="p-2 h-full w-full flex justify-center items-center">No results</div>
        {/if}
    </div>
</div>
