<script lang="ts">
  import TimelineMarker from './TimelineMarker.svelte';

  import moment, { type Moment } from "moment-timezone";
  import { onMount } from "svelte";
  import { SECONDS_IN_DAY, getDayProgress, getSecondsSinceMidnight, TIME_FORMAT } from "./Global";
  import DayLengthRange from "./DayLengthRange.svelte";
  import Map from "./Map.svelte";

  async function refreshTargetTime(lat, lng) {
    // @ts-ignore This is imported from a cdn in index.html
    var timezone = await GeoTZ.find(lat, lng);
    var timezone = timezone[0];

    console.log(timezone);

    // Refresh the target time
    var url = `https://worldtimeapi.org/api/timezone/${timezone}`

    fetch(url, /* opts */)
      .then(response => response.json())
      .then(data => {
        target_region_time = moment(data.datetime);
        target_region_time.tz(timezone);
      })
      .catch(err => {
        console.log(err);
      });
  }

  var target_region_time = moment();
  var my_current_time = moment();

  // Update the time variables every second
  setInterval(() => {
    console.log("Updating time ...");
    
    target_region_time.add(1, "seconds");
    target_region_time = target_region_time;

    my_current_time = my_current_time.add(1, "seconds");
    my_current_time = moment();
  }, 1000);

  // Sunrise
  var sunrise = moment().startOf("day").add(6, "hours").add(30, "minutes");
  // Sunset
  var sunset = moment().startOf("day").add(18, "hours").add(30, "minutes");

  var fetch_res = null;

  const abortController = new AbortController();

  function fetch_sunrise_and_sunset_data(lat, lon) {
    // Abort the previous fetch request
    /* abortController.abort(); */

    var url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}`;
    /* var url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today&formatted=0`; */

    // Fetch sunset and sunrise data
   fetch_res = fetch(url, {
      signal: abortController.signal
    })
    .then(response => response.json())
    .then(data => {
      sunrise = moment(data.results.date + ' ' + data.results.sunrise);
      sunset = moment(data.results.date + ' ' + data.results.sunset);      
    })
    .catch(err => {
      console.log(err);
    });
  }

  function map_moved_handler(e) {
    var lng = e.detail.lng;
    var lat = e.detail.lat;

    // Limit the coordinates wrapping them around the globe
    
    while (lng > 180 || lng < -180) {
      if (lng > 180) {
        lng = lng - 360;
      } else if (lng < -180) {
        lng = lng + 360;
      }
    }

    refreshTargetTime(lat, lng);
    fetch_sunrise_and_sunset_data(lat, lng);
  }
</script>

<div class="absolute z-[1100] flex items-center justify-center w-screen h-screen bg-neutral-800/80 text-white" id="intro-panel">
  <div class="flex flex-col items-center">
    <h1 class="mb-3 font-mono text-5xl">Daytime Viewer</h1>
    
    <p class="mb-4 text-xl">Find out what the time is like in other places and when the sun rises and sets.</p>
    
    <p class="mb-2">
      Special thanks go to <a class="underline" href="https://sunrise-sunset.org/api">sunrise-sunset.org</a> for providing the sunrise and sunset data.
    </p>
    <p>
      Special thanks go to <a class="underline" href="https://worldtimeapi.org/">worldtimeapi.org</a> for providing the timezone data.
    </p>

    <!-- A button which hides this panel and reveals the app saying lets start -->
    <button class="px-4 py-2 mt-4 font-mono text-xl text-green-900 bg-green-500 rounded-md" on:click={() => {
      document.getElementById('intro-panel')?.classList.add('hidden');
    }}>Let's start</button>
  </div>
</div>

<div class="flex flex-col justify-center min-h-screen gap-0 overflow-hidden text-white bg-neutral-800">
  
  <div class="flex justify-between">
      <div class="p-2 font-mono font-bold">Daytime Viewer</div>
      <div class="flex">
        <div class="p-2">made by</div>
        <a class="p-2 transition-all hover:bg-neutral-700" href="https://maximmaeder.com/">Maxim Maeder</a>
      </div>
  </div>

  <Map on:map-moved={map_moved_handler}/>

  <div class="relative h-32 transition-all hover:h-40 bg-neutral-900">

    <div class="absolute flex flex-col w-full h-full pt-12">
      <DayLengthRange label="Target dayrange in local time" sunrise={sunrise} sunset={sunset}></DayLengthRange>

      {#if moment().format(TIME_FORMAT) != target_region_time.format(TIME_FORMAT)}
        <DayLengthRange 
          label="Target dayrange in my time"
          sunrise={sunrise.clone().add(moment().utcOffset() - target_region_time.utcOffset(), 'minutes')}
          sunset={sunset.clone().add(moment().utcOffset() - target_region_time.utcOffset()  , 'minutes')}
          >
        </DayLengthRange>
      {/if}
    </div>

    <!-- Show lines indicating the hours using a loop -->
    {#each Array.from({ length: 23 }) as _, i}
      <div class="absolute top-0 h-full bg-neutral-500 opacity-15" style="left: { i * 100 / 24 + ( 100 / 24 )}vw; width: 2px">
        <div class="pl-1">{ i + 1 }</div>
      </div>
    {/each}

    <TimelineMarker classes="bg-green-500" date={target_region_time}></TimelineMarker>
    
    {#if my_current_time.format(TIME_FORMAT) != target_region_time.format(TIME_FORMAT)}
      <TimelineMarker classes="bg-red-500" date={my_current_time}></TimelineMarker>
    {/if}
  </div>
</div>