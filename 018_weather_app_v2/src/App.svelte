<script lang="ts">
  import { onMount } from "svelte";
  import moment from "moment";
  import GeoSearchComponent from "./GeoSearchComponent.svelte";
  import { getWeatherData } from "./Helpers";
  import type { WeatherData } from "./Helpers";
  import { getWeatherCodeName } from "./Helpers";

  let curr_d: WeatherData = {};
  let current_location = {
    name: "Berlin",
    lat: 52.52,
    lon: 13.41
  };

  $: {
    current_location;
    reFetch();
  }

  onMount(async () => {
    reFetch();
  });

  async function reFetch() {
    curr_d = await getWeatherData({lat: current_location.lat, lon: current_location.lon});

    console.log('curr_d', curr_d);
  }

</script>

<div class="h-screen w-screen relative">
  <img src="/wc/{curr_d?.current?.weatherCode}.jpg" alt="" class="absolute top-0 left-0 w-full h-full brightness-75 object-cover">

  <div class="absolute flex h-full w-full gradient text-white">
    
    <div class="grow p-8 flex text-white items-center">
      <div>
        <div class="text-6xl font-bold uppercase mb-6">
          { current_location.name }
          {#if curr_d.current}
            {curr_d.current.isDay ? '🌞' : '🌙'}
          {/if}
        </div>
        <div class="text-3xl flex gap-4">
          { moment(curr_d?.current?.time).format('hh:mm') }
          <span class="text-neutral-400">-</span>
          { Math.round(curr_d?.current?.temperature) }°
          <span class="text-neutral-400">-</span>
          { getWeatherCodeName(curr_d?.current?.weatherCode) }
        </div>
      </div>
    </div>

    <div class="w-1/3 backdrop-blur-sm p-4 shadow-xl border-l-2 border-l-neutral-900/20">
      <GeoSearchComponent bind:chosen_location={current_location} />

      <div class="p-2 overflow-auto">
        <!-- <pre>{ JSON.stringify(curr_d, null, 4) }</pre> -->

        <!-- Show the next 12 hours in weather -->
        <div class="grid gap-1">
          {#if curr_d?.hourly?.time}
            {#each curr_d?.hourly?.time.slice(0, 6) as hour, i}
              <div class="px-1 bg-neutral-900/20 rounded-lg flex justify-between">
                <div class="">{ moment(hour).format('hh:mm') }</div>
                <div class="">{ Math.round(curr_d?.hourly?.temperature[i]) }°</div>
                <!-- <div class="text-sm">{ getWeatherCodeName(hour) }</div> -->
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>