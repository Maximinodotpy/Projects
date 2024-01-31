<script lang="ts">
  import moment, { type Moment } from "moment-timezone";
  import { SECONDS_IN_DAY, getDayProgress, getSecondsSinceMidnight, TIME_FORMAT } from "./Global";
  
    export var date = moment();
    export var classes = ""
</script>

{#each Array.from({ length: 3 }) as _, i}
    <div class="transition-all whitespace-nowrap duration-1000 pt-5 absolute top-0 w-[2px] h-full { classes }" style="left: calc({getDayProgress(date) * 100 + ((i - 1) * 100)}vw - 1px)">
        <div class="flex gap-2 pl-2">
            <div>{ date.format(TIME_FORMAT) }</div>

            {#if date.tz()}
                <div class="font-mono opacity-50">{ date.tz() }</div>
            {/if}
        </div>
    </div>
{/each}
