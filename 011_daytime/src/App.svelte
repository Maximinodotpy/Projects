<script lang="ts">
  import moment, { type Moment } from "moment-timezone";
  import { onMount } from "svelte";
  import { getDayProgress, getSecondsSinceMidnight } from "./Global";
  import DayLengthRange from "./DayLengthRange.svelte";

  // How many seconds are in a day
  const secondsInADay = 24 * 60 * 60;

  // Find out how many seconds have passed since midnight
  var secondsSinceMidnight = 0

  function updateTimeVariables() {
    secondsSinceMidnight = moment().diff(moment().startOf("day"), "seconds");
  }

  var target_region_time = moment();
  
  updateTimeVariables();

  // Update the time variables every second
  setInterval(updateTimeVariables, 1000);

  // Sunrise
  var sunrise = moment().startOf("day").add(6, "hours").add(30, "minutes");
  $: sunriseSeconds = sunrise.diff(moment().startOf("day"), "seconds");

  // Sunset
  var sunset = moment().startOf("day").add(18, "hours").add(30, "minutes");
  $: sunsetSeconds = sunset.diff(moment().startOf("day"), "seconds");

  // Day length
  $: dayLength = sunset.diff(sunrise, "seconds");

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

      /* console.log(data); */

      /* console.log(moment().utcOffset(data.results.utc_offset).format('hh:mm')); */

      
      target_region_time = moment().add(data.results.utc_offset - moment().utcOffset(), 'minutes');
      console.log('-------------');
      
      console.log(target_region_time.tz(data.results.timezone).zoneAbbr());

      console.log(`Target UTC: ${data.results.timezone}`);

      console.log(`Target UTC Offset: ${data.results.utc_offset}`);
      console.log(`Target time: ${target_region_time.format('hh:mm')}`);
      console.log(`Target time fraction of day: ${getDayProgress(target_region_time)}`);
      
      
      console.log(`Local UTC Offset: ${moment().utcOffset()}`);
      console.log(`Local time: ${moment().format('hh:mm')}`);
      console.log(`Local time fraction of day: ${getDayProgress(moment())}`);

      // PRint target time difference to midnight
      /* console.log(`Target time difference to midnight: ${target_region_time.diff(moment().startOf('day'), "seconds")}`); */
      /* console.log(target_region_time); */
      
      console.log('-------------');
      
      
    })
    .catch(err => {
      console.log(err);
    });
  }

  fetch_sunrise_and_sunset_data(47.50737, 19.04611)

  onMount(() => {
    // Where you want to render the map.
    var element = document.getElementById('osm-map');

    // Create Leaflet map on map element.
    var map = L.map(element);

    map.on('moveend', function() {
      var center = map.getCenter();
      /* console.log(center.lat, center.lng); */

      fetch_sunrise_and_sunset_data(center.lat, center.lng)      
    });

    // Add OSM tile layer to the Leaflet map.
    /* L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); */

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
        attribution: 'https://stadiamaps.com/'
    }).addTo(map);

    // Target's GPS coordinates.
    var target = L.latLng('47.50737', '25.04611');

    // Set map's center to target with zoom 14.
    map.setView(target, 14);

    // Place a marker on the same location.
    L.marker(target).addTo(map);
  })
  
</script>

<div class="flex flex-col justify-center min-h-screen gap-0 overflow-hidden text-white bg-neutral-800">
  <div id="osm-map" class="grow"></div>

  <div class="relative h-32 transition-all hover:h-40 bg-neutral-900">

    <div class="absolute flex flex-col w-full h-full pt-12">
      <DayLengthRange label="Target dayrange in local time" sunrise={sunrise} sunset={sunset}></DayLengthRange>

      {#if moment().format('hh:mm') != target_region_time.format('hh:mm')}
        <DayLengthRange 
          label="Target dayrange in my time"
          sunrise={sunrise.clone().add(target_region_time.utcOffset() - moment().utcOffset(), 'minutes')}
          sunset={sunset.clone().add(target_region_time.utcOffset() - moment().utcOffset(), 'minutes')}
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

    <div class="pt-5 absolute top-0 w-[2px] h-full bg-green-500" style="left: calc({getDayProgress(target_region_time) * 100}vw - 1px)" title="This is the time at the target location">
      <div class="flex gap-2 pl-2">
        <div>{ target_region_time.format('hh:mm') }</div>
        <div class="font-mono opacity-50">{ target_region_time.tz() }</div>
      </div>
    </div>
    
    {#if moment().format('hh:mm') != target_region_time.format('hh:mm')}
      <div class="pt-5 absolute top-0 w-[2px] h-full bg-red-500" style="left: calc({secondsSinceMidnight  / secondsInADay * 100}vw - 1px)" title="This is the time at your location">
        <div class="pl-2">{ moment().format('hh:mm') }</div>
      </div>
    {/if}
  </div>
</div>