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
  let is_loading = false;
  let current_date = Date.now();
  let current_event_index = 0;
  const KEY = 'AIzaSyCuilqVytCXEv4iokKypvDO7GH7X958vSk'

  function refreshData() {
    console.log("Refreshing data ...");
    is_loading = true;

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

        console.log("Looping over events ...");
        for (const event of data.selected) {
          event.text = await translateText(event.text);

          for (const page of event.pages) {
            page.normalizedtitle = await translateText(page.normalizedtitle);
          }
        }
        console.log("Done translating ...");

        data = data;

        is_loading = false;
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
    console.log(translateText("Hello World"));
  });

  async function translateText(text, target = "de") {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${KEY}&q=${text}&target=${target}`;

    const res = await fetch(url)
    const data = await res.json()

    const translatedText = data.data.translations[0].translatedText;
    
    return translatedText;  
  }  

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

<div class="h-screen overflow-y-hidden flex flex-col w-full">
  <div class="p-3 bg-neutral-200 text-3xl font-bold text-center w-full">
    On this day
  </div>

  <div class="max-w-4xl mx-auto pt-8 w-full">
    <input type="date" id="date" class="border border-2 w-full px-4 py-2" on:change={dateChanged} />
    <div class="p-2">Es wurden { data.selected.length } Ereignisse an diesem Datum gefunden. Du bist momentan auf dem {current_event_index} Ereignis vom {moment(current_date).format('DD.MM')}.</div>
  </div>

  <div class="flex mx-auto px-4 grow w-full { is_loading ? 'animate-pulse': '' }">
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
  </div>
</div>
