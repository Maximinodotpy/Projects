<script lang="ts">
  import { onMount } from "svelte";

  console.log("App started ...");

  let data = {
    selected: [],
    births: [],
    deaths: [],
    events: [],
  };

  let image = "";

  let current_date = Date.now();

  function refreshData() {
    let date = new Date(document.getElementById("date")?.value ?? 0);

    let month = date.getMonth() + 1 ?? 0;
    let day = date.getDate() ?? 0;

    month.toString().length == 1 ? (month = "0" + month) : month;
    day.toString().length == 1 ? (day = "0" + day) : day;

    let url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`;

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((return_data) => {
        console.log(return_data);
        data = return_data;
      })
      .catch((error) => console.error(error));
  }

  refreshData();

  const API_KEY = "933b02c4-3b07-4bdf-bd5b-a06a679f9960";

  onMount(async () => {
    var year = new Date().getFullYear();
    document.getElementById("date").setAttribute("min", year + "-01-01");
    document.getElementById("date").setAttribute("max", year + "-12-31");

    // Set to today's date
    document.getElementById("date").valueAsDate = new Date();

    refreshData();
  });
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>
<div>
  <div class="p-6 bg-neutral-200 text-3xl font-bold text-center">
    On this day
  </div>

  <div class="max-w-3xl mx-auto pt-8">
    <input type="date" id="date" class="border border-2 w-full px-4 py-2" />
  </div>

  <div class="flex flex-col gap-8 max-w-3xl mx-auto mt-10 mb-10 px-4">
    {#each data.selected as event}
      <div class="flex items-center">
        <img
          class="w-20 h-20 object-cover shrink-0 border"
          src={event.pages[0]?.thumbnail?.source}
          alt=""
        />

        <div class="grid p-4 gap-3">
          <div>
            <bold class="font-bold">{ event.year }</bold>
            {event.text}
          </div>
          <div class="flex gap-2 flex-wrap text-xs">
            {#each event?.pages as page}
              <a target="_blank" href="https://en.wikipedia.org/wiki/{page.title}" class="bg-neutral-200 px-2 py-1 rounded-md">{ page?.normalizedtitle }</a>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<img src={image} alt="" />
