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

<div class="relative w-screen h-screen overflow-hidden">
  <img src="wc/wc{curr_d?.current?.weatherCode}.jpg" alt="" class="absolute top-0 left-0 object-cover w-full h-full brightness-75">

  <div class="flex w-full h-full text-white gradient relative">
    
    <div class="flex items-end p-8 text-white grow">
      <div>
        <div class="mb-6 text-7xl font-bold uppercase">
          { current_location.name }
          {#if curr_d.current}
            {curr_d.current.isDay ? '🌞' : '🌙'}
          {/if}
        </div>
        <div class="flex gap-4 text-4xl">
          { moment(curr_d?.current?.time).format('hh:mm') }
          <span class="text-neutral-400">-</span>
          { Math.round(curr_d?.current?.temperature) }°
          <span class="text-neutral-400">-</span>
          { getWeatherCodeName(curr_d?.current?.weatherCode) }
        </div>
      </div>
    </div>

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div class="w-1/3 p-4 border-l-2 shadow-xl backdrop-blur-sm border-l-neutral-900/20 absolute hover:right-0 h-full -right-[30%] transition-all duration-300 focus-within:right-0" tabindex="0">
      <GeoSearchComponent bind:chosen_location={current_location} />

      <div class="p-2 overflow-auto">
        <div class="grid gap-1">
          {#if curr_d?.hourly?.time}
            {#each curr_d?.hourly?.time.slice(0, 6) as hour, i}
              <div class="flex justify-between px-1 rounded-lg bg-neutral-900/20">
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