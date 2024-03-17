<script lang="ts">
    import { onMount } from "svelte";
    import { DataSet } from "vis-data/peer";
    import { Timeline } from "vis-timeline/peer";
    import type { TimelineOptions } from "vis-timeline/peer";
    import "vis-timeline/styles/vis-timeline-graph2d.css";
    import { data/* , groups */ } from "./history-data";
    import { createPersistentStore } from "./stores";
    import moment from "moment";
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

    let currentSelection: number[] = [];

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

    function getTimeDifferenceBeetwenEvents(first: number, second: number) {
      const firstEvent = data.get(first);
      const secondEvent = data.get(second);

      console.log(firstEvent, secondEvent);
      

      // @ts-ignore
      const firstDate = moment(firstEvent.start);
      // @ts-ignore
      const secondDate = moment(secondEvent.start);

      // Create a duration which shows depending the length years days hours minuts or seconds in combination
        const duration = moment.duration(secondDate.diff(firstDate));

        const years = Math.abs(duration.years());
        const months = Math.abs(duration.months());
        const days = Math.abs(duration.days());
        const hours = Math.abs(duration.hours());
        const minutes = Math.abs(duration.minutes());
        const seconds = Math.abs(duration.seconds());

        let output = [];

        if (years > 0) {
            output.push(`${years} years`);
        }

        if (months > 0) {
            output.push(`${months} months`);
        }

        if (days > 0) {
            output.push(`${days} days`);
        }

        if (hours > 0) {
            output.push(`${hours} hours`);
        }

        if (minutes > 0) {
            output.push(`${minutes} minutes`);
        }

        if (seconds > 0) {
            output.push(`${seconds} secon`);
        }

        return output.join(", ");
    }
</script>

<div class="bg-neutral-900 pt-20">
    <div class="mb-6 container">
        <h2>Timeline</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore autem nihil, quam vitae libero inventore adipisci harum error qui animi at? Sit voluptatibus obcaecati facilis asperiores perferendis minima laudantium sapiente?</p>
    </div>

    <div class="h-screen flex flex-col">
      <div class="px-6 py-3 flex gap-3 items-center">
        <button class="btn-dark" on:pointerdown={() => { timeline.fit({ animation: true }) }}>Fit all events</button>
    
        <button class="btn-dark transition-opacity {currentSelection.length == 0 ? 'opacity-50': ''}" disabled={currentSelection.length == 0} on:pointerdown={() => {
          const selection = timeline.getSelection();
          if (selection.length > 0) {
            timeline.focus(selection);
          }
        }}>Focus selected</button>
    
    
        <label class="inline-flex items-center btn-dark">
          <input type="checkbox" bind:checked={$shouldCluster} />
          <span class="ml-2">Cluster</span>
        </label>
    
        <label class="inline-flex items-center btn-dark">
          <input type="checkbox" bind:checked={$multipleSelection} />
          <span class="ml-2">Multiple selection</span>
        </label>

        <div>
            {#if currentSelection.length == 2}
                { getTimeDifferenceBeetwenEvents(currentSelection[0], currentSelection[1]) } Difference
            {:else if currentSelection.length == 1}
                { moment(data.get(currentSelection[0]).start).format("D.M.YYYY hh:mm:ss") }
            {/if}
        </div>
      </div>
    
      <div id="timeline" class="grow"></div>
    </div>
</div>
