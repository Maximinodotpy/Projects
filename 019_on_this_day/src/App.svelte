<script lang="ts">
  import { onMount } from "svelte";
  import moment from "moment";

  console.log("App started ...");

  let data = {
    selected: [],
    births: [],
    deaths: [],
    events: [],
  };
  let image = "";
  let current_date = Date.now();
  let current_event_index = 0;

  let event_types = ["selected", "births", "deaths", "events"];
  let event_type = "selected";

  function refreshData() {
    console.log("Refreshing data ...");

    current_event_index = 0;

    let date = new Date(document.getElementById("date")?.value ?? 0);

    let month = date.getMonth() + 1 ?? 0;
    let day = date.getDate() ?? 0;

    month.toString().length == 1 ? (month = "0" + month) : month;
    day.toString().length == 1 ? (day = "0" + day) : day;

    let url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`;

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then(async (to_be_translated) => {
        data = to_be_translated;
      })
      .catch((error) => console.error(error));
  }

  onMount(async () => {
    var year = new Date().getFullYear();
    document.getElementById("date").setAttribute("min", year + "-01-01");
    document.getElementById("date").setAttribute("max", year + "-12-31");

    // Set to today's date
    document.getElementById("date").valueAsDate = new Date();

    refreshData();

    console.log("Translating text ...");
  });

  function dateChanged() {
    console.log("Date changed ...");
    
    refreshData();
  }

  function getImageFromEvent(event) {
    // Loop over all pages and return the first one wie a valid image

    for (const iterator of event?.pages ?? []) {
      if (iterator.thumbnail) {
        // get this image in case its landscape oriented
        if (iterator.thumbnail.width > iterator.thumbnail.height) {
          return iterator.thumbnail.source;
        }
      }
    }

    return 'https://placehold.co/600x400?text=Kein Bild vorhanden ...';
  }
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="flex flex-col w-full">
  <div class="p-3 bg-neutral-200 flex w-full items-center gap-3">
    <div class="font-bold grow text-3xl">On this day</div>

    <div>
      <input type="date" id="date" class="border border-2 w-full px-4 py-2" on:change={dateChanged} />
    </div>

    <div class="flex gap-2">
      {#each event_types as type}
        <button class="px-2 py-1 rounded-md text-white { type == event_type ? 'bg-neutral-600': 'bg-neutral-400' }" on:click={() => event_type = type}>{ type }</button>
      {/each}
    </div>
  </div>
  

  <div class="max-w-4xl mx-auto">
    <!-- Loop over all selected events -->
    {#each data[event_type] as event, index}
      <div class="flex p-8 items-center gap-4">
        <div class="flex w-40 shrink-0 border">
          <img src="{ getImageFromEvent(event) }" alt="" class="object-contain max-h-full mx-auto max-w-full">
        </div>
        
        <div class="grow grid gap-3">
          <div><bold class="font-bold">{ event?.year }</bold> { event?.text }</div>

          <div class="flex gap-2 flex-wrap text-xs">
            {#each event?.pages || [] as page}
              <a target="_blank" href="https://en.wikipedia.org/wiki/{page.title}" class="bg-neutral-300 px-2 py-1 rounded-md">{ page?.normalizedtitle }</a>
            {/each}
          </div>
        </div>
      </div>
    {/each}  
  </div>

  <!-- <div class="flex mx-auto px-4 grow w-full">
    <button on:click={() => current_event_index--} class="{current_event_index == 0 ? 'invisible': ''} shrink-0 opacity-50 hover:opacity-100 transition-all">
      Zurück
    </button>
    
    <div class="h-full grow flex flex-col bg-neutral-100 py-4 overflow-hidden">
      <div class="grow overflow-hidden flex">
        <img src="{ getImageFromEvent(data.selected[current_event_index]) }" alt="" class="object-contain max-h-full mx-auto max-w-full">
      </div>
      <div class="p-4"><bold class="font-bold">{ data.selected[current_event_index]?.year }</bold> { data.selected[current_event_index]?.text }</div>

      <div class="flex gap-2 flex-wrap text-xs px-4">
        {#each data.selected[current_event_index]?.pages || [] as page}
          <a target="_blank" href="https://en.wikipedia.org/wiki/{page.title}" class="bg-neutral-200 px-2 py-1 rounded-md">{ page?.normalizedtitle }</a>
        {/each}
      </div>
    </div>
    
    <button on:click={() => current_event_index++} class="{current_event_index == data.selected.length-1 ? 'invisible': ''} shrink-0 opacity-50 hover:opacity-100 transition-all">
      Weiter
    </button>
  </div> -->
</div>
