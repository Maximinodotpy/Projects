<script lang="ts">
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
    var url = `http://worldtimeapi.org/api/timezone/${timezone}`

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
    if (lng > 180) {
      lng = lng - 360;
    } else if (lng < -180) {
      lng = lng + 360;
    }

    refreshTargetTime(lat, lng);
    fetch_sunrise_and_sunset_data(lat, lng);
  }
</script>

<div class="flex flex-col justify-center min-h-screen gap-0 overflow-hidden text-white bg-neutral-800">
  <div>
    <div>{ my_current_time.format() }</div>
    <div>{ target_region_time.format() }</div>
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

    <div class="transition-all duration-1000 pt-5 absolute top-0 w-[2px] h-full bg-green-500" style="left: calc({getDayProgress(target_region_time) * 100}vw - 1px)" title="This is the time at the target location">
      <div class="flex gap-2 pl-2">
        <div>{ target_region_time.format(TIME_FORMAT) }</div>
        <div class="font-mono opacity-50">{ target_region_time.tz() }</div>
      </div>
    </div>
    
    {#if my_current_time.format(TIME_FORMAT) != target_region_time.format(TIME_FORMAT)}
      <div class="pt-5 absolute top-0 w-[2px] h-full bg-red-500" style="left: calc({getDayProgress(my_current_time) * 100}vw - 1px)" title="This is the time at your location">
        <div class="pl-2">{ moment().format('HH:mm') }</div>
      </div>
    {/if}
  </div>
</div>