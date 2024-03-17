<script lang="ts">
    import { onMount } from "svelte";
    import { DataSet } from "vis-data/peer";
    import { Timeline } from "vis-timeline/peer";
    import type { TimelineOptions } from "vis-timeline/peer";
    import "vis-timeline/styles/vis-timeline-graph2d.css";
    import { data/* , groups */ } from "./history-data";
    import { createPersistentStore } from "./stores";
    // You may import from other packages like Vis Network or Vis Graph3D here.
    // You can optionally include locales for Moment if you need any.
    
    // Configuration for the Timeline
    const options: TimelineOptions = {
      height: "100%",
      zoomMax: 31556952000 * 130, // 1 year in milliseconds
      zoomMin: 1000 * 60,
    };

    const shouldCluster = createPersistentStore("shouldCluster", true);
    const multipleSelection = createPersistentStore("multipleSelection", true);
    const range = createPersistentStore("range", {
      start: "1900-01-01",
      end: "1999-12-31",
    });

    let timeline: Timeline;

    let currentSelection = [];

    $: {
      if (timeline) {
        options.cluster = $shouldCluster;
        options.multiselect = $multipleSelection;

        console.log("options", options);

        timeline.setOptions(options);

        // Clear selection
        timeline.setSelection([]);
      }
    }
    
    onMount(() => {
      // DOM element where the Timeline will be attached
      const container = document.getElementById("timeline");

      // Create a Timeline
      // @ts-ignore
      timeline = new Timeline(container, data/* , groups */, options);

      timeline.setWindow($range.start, $range.end, { animation: false });

      timeline.on("select", (props) => {
        console.log("select", props);

        currentSelection = props.items;
      });

      // On zoom
      timeline.on("rangechange", (props) => {
        range.set({
          start: timeline.getWindow().start.toISOString(),
          end: timeline.getWindow().end.toISOString(),
        });
      });
    });
</script>

<div class="bg-neutral-900 pt-20">
    <div class="mb-6 container">
        <h2>Timeline</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore autem nihil, quam vitae libero inventore adipisci harum error qui animi at? Sit voluptatibus obcaecati facilis asperiores perferendis minima laudantium sapiente?</p>
    </div>

    <div class="h-screen flex flex-col">
      <div class=" px-6 py-3">
        <button class="btn-dark" on:pointerdown={() => { timeline.fit({ animation: true }) }}>Fit all events</button>
    
        <button class="btn-dark transition-opacity {currentSelection.length == 0 ? 'opacity-50': ''}" disabled={currentSelection.length == 0} on:pointerdown={() => {
          const selection = timeline.getSelection();
          if (selection.length > 0) {
            timeline.focus(selection);
          }
        }}>Focus selected</button>
    
    
        <!-- { currentSelection.length } -->
    
        <label class="inline-flex items-center btn-dark">
          <input type="checkbox" bind:checked={$shouldCluster} />
          <span class="ml-2">Cluster</span>
        </label>
    
        <label class="inline-flex items-center btn-dark">
          <input type="checkbox" bind:checked={$multipleSelection} />
          <span class="ml-2">Multiple selection</span>
        </label>
      </div>
    
      <div id="timeline" class="grow"></div>
    </div>
</div>
