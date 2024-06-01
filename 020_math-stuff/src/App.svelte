<script lang="ts">
  import panzoom, { type PanZoom } from "panzoom";
  import { onMount } from "svelte";
  import Victor from "Victor";

  let svg: SVGElement;
  let panZoom: PanZoom;

  let distance = 300;

  let is_currently_resetted = false;
  let is_currently_programmatical_zoom = false;

  $: {
    distance;

    if (is_currently_resetted) {
      resetZoom();
    }
  }

  onMount(() => {
    panZoom = panzoom(svg, {
      initialZoom: 1,
    });

    panZoom.on("panend", (e) => {
      console.log("transform", e, is_currently_resetted, is_currently_programmatical_zoom);

      if (is_currently_programmatical_zoom) {
        return;
      }

      is_currently_resetted = false;
    });

    resetZoom();

    return () => {
      console.log("dispose");
      panZoom.dispose();
    };
  });

  function resetZoom() {
    console.log("resetZoom");
    
    is_currently_programmatical_zoom = true;

    let zoomAmount = window.innerWidth / (distance + 55)
    panZoom.zoomAbs(0, 0, zoomAmount);
    panZoom.moveTo(50 * zoomAmount, window.innerHeight/2 - (50/2));    

    is_currently_resetted = true;
    is_currently_programmatical_zoom = false;
  }
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="h-screen flex flex-col">
  <div class="overflow-hidden bg-neutral-900 grow">
    <svg class="w-full h-full">
      <g bind:this={svg}>
        <!-- Draw a line between the two with a label in the middle stating the distance -->
        <line x1="0" y1="0" x2={distance} y2="0" stroke="grey" />
        <text x={distance/2} y="-10" fill="grey" font-size="{10}" text-anchor="middle">{distance} km</text>

        <!-- Zeichne eine Linie die vom kleinen kreis ausgeht und denn grossen kreis tangiert -->
        <line x1={distance} y1="0" x2="100" y2="100" stroke="grey" />

        <circle cx="0" cy="0" r="50" fill="grey" />

        <circle cx={distance} cy="0" r="5" fill="green" />
      </g>
    </svg>
    <div class="absolute bottom-1/4 flex justify-center w-full pointer-events-none	">
      <div class="px-2 py-1 rounded-md bg-neutral-200 pointer-events-auto opacity-25 hover:opacity-100 transition-all flex gap-6">
        <button on:click={resetZoom}>Center View</button>
        <div class="relative">
          <input type="number" class="rounded-md pl-1 pr-8 w-28 text-right" bind:value={distance}>
          <div class="absolute right-2 top-0 pointer-events-none opacity-50">Km</div>
        </div>
      </div>
    </div>
  </div>
</div>