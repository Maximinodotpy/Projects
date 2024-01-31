<script>
    import moment from "moment";
    import { SECONDS_IN_DAY, getDayProgress } from "./Global";

    export var sunrise = moment().startOf("day").add(6, "hours").add(30, "minutes");
    export var sunset = moment().startOf("day").add(18, "hours").add(30, "minutes");

    export var label = ''
</script>


<div class="relative grow">
    {#each Array.from({ length: 3 }) as _, i}  
        <div class="absolute flex items-center justify-between h-full transition-all duration-1000 bg-neutral-700" style="margin-left: {getDayProgress(sunrise) * 100 + ((i -1 ) * 100)}vw; width: { sunset.diff(sunrise, 'seconds') / SECONDS_IN_DAY * 100 }vw">
            <div class="p-1 pl-2 font-mono opacity-50">Sunrise: { sunrise.format('hh:mm') }</div>
            <div class="p-1 pl-2 font-mono opacity-50">{ sunset.diff(sunrise, 'minute') } Minutes</div>
            <div class="p-1 pr-2 font-mono opacity-50">Sunset: { sunset.format('hh:mm') }</div>
        
            {#if i == 1}
                <div class="absolute pl-2 left-full whitespace-nowrap">{ label }</div>
            {/if}
        </div>
    {/each}
</div>

