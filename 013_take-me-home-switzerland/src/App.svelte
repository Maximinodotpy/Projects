<script lang="ts">
  import { onMount } from "svelte";
  import moment from "moment";
  import { createPersistentStore } from './stores';
  
  let connection: { connections: Connection[] } = { connections: [] };

  let from = createPersistentStore("from", "Lausanne");
  let to = createPersistentStore("to", "Geneva");

  $: {
    $from = $from;
    $to = $to;

    search();
  }

  onMount(() => {
    search();
  });

  function setCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);

      $from = `${position.coords.latitude},${position.coords.longitude}`;
    });
  }
  
  function search() {
    fetch(`http://transport.opendata.ch/v1/connections?from=${$from}&to=${$to}`)
      .then(re => re.json())
      .then(data => {
        console.log(data);
        connection = data;
      });
  }
</script>

<div class="flex flex-col h-screen overflow-hidden bg-zinc-800 text-zinc-300">
  <header class="p-4 border-b border-b-neutral-600">
    <h1 class="mb-4 font-bold uppercase">Take me home</h1>

    <div class="grid grid-cols-2 gap-6">
      
      <div class="flex">
        <input class="px-2 py-1 grow bg-neutral-700" type="text" placeholder="From" bind:value={$from} />
        <button class="px-2 border bg-neutral-800 border-neutral-500 whitespace-nowrap" on:pointerdown={setCurrentLocation}>Current Pos</button>
      </div>
      
      <input class="px-2 py-1 bg-neutral-700" type="text" placeholder="To" bind:value={$to} />
      
    </div>
  </header>
  
  <main class="overflow-x-hidden overflow-y-auto grow">
    <ul class="divide-y-[1px] divide-zinc-600">
      {#each connection.connections as conn}
        <li class="max-w-4xl px-4 py-6 mx-auto">
          <div class="flex items-center justify-between mb-3 whitespace-nowrap">
            <div class="overflow-hidden max-w-[50%] text-ellipsis">{ conn.from.station.name }</div>
            <div class="flex items-center gap-3">
              <div>{ conn.to.station.name }</div>
              <code class="flex gap-2 text-xs">
                {#each conn.products as product}
                  <div class="tag">{ product }</div>
                {/each}
              </code>
            </div>
          </div>
          <div class="flex items-center gap-3 mb-10">
            <p>{ moment(conn.from.departure).format('hh:mm') }</p>

            <div class="relative flex h-4 text-xs transition-all grow hover:h-10">
              <div class="flex w-full h-full overflow-hidden text-xs divide-x rounded-md bg-neutral-700 divide-neutral-400">
                {#each conn.sections as section, i}
                  <!-- {#if i > 0}
                    <div style="width: {moment(section.departure.departure).diff(conn.sections[i - 1].arrival.arrival, 'minutes') / moment(conn.to.arrival).diff(conn.from.departure, 'minutes') * 100}%" class="flex items-center justify-center">
                      { moment(section.departure.departure).diff(conn.sections[i - 1].arrival.arrival, 'minutes') } min wait
                    </div>
                  {/if}
                  
                  <div class="h-full bg-neutral-600" style="
                    width: {(moment(section.arrival.arrival).diff(section.departure.departure, 'minutes') / moment(conn.to.arrival).diff(conn.from.departure, 'minutes') * 100)}%;"></div> -->
                {/each}
              </div>

              <div class="absolute w-full pt-1 text-center top-full">
                { moment(conn.to.arrival).from(conn.from.departure) }
              </div>
            </div>

            <p>{ moment(conn.to.arrival).format('hh:mm') }</p>
          </div>

          <details class="border border-transparent open:border-neutral-600 group">
            <summary class="p-3 group-open:border-b border-b-neutral-600">Sections</summary>
            <div class="divide-y divide-neutral-600">
              {#each conn.sections as section, i}
                <div class="p-3 transition-colors hover:bg-neutral-900/50">
                  {#if section.journey}
                    <div class="flex justify-between">
                      <div class="flex gap-2">
                        <div class="tag">{ section.journey.number }</div>
                        <div>{ section.journey.to }</div>
                      </div>

                      <div class="flex gap-1">
                        <!-- Get the wait time since the last sections arrivali if that makes sense -->
                        {#if i > 0}
                          <div class="opacity-50">
                            waiting { moment(section.departure.departure).diff(conn.sections[i - 1].arrival.arrival, 'minutes') } min until
                          </div>
                        {/if}

                        <div class="opacity-50">
                          { moment(section.departure.departure).format('hh:mm') }
                          {#if section.departure.platform}
                            at pl. { section.departure.platform }
                          {/if}
                        </div>
                        <div class="opacity-50">/</div>
                        <div>
                          { moment(section.arrival.arrival).format('hh:mm') }
                          {#if section.arrival.platform}
                            at pl. { section.arrival.platform }
                          {/if}
                        </div>
                      </div>
                    </div>
                  {:else}
                    <div>Walk { moment().add(section.walk?.duration, 'seconds').fromNow() }</div>
                  {/if}
                </div>
              {/each}
            </div>
          </details>
        </li>
      {/each}
    </ul>
  </main>
</div>