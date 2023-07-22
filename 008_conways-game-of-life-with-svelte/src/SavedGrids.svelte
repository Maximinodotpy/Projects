<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';

    const dispatch = createEventDispatcher();

    function loadSaved(grid) {
        dispatch('load_saved', {
            grid: grid
        });
    }

    const savedGrids: SavedGrid[] = [
        {
            name: "Glider",
            created: new Date().getMilliseconds(),
            grid: [
                { x: 0, y: 2 },
                { x: 1, y: 2 },
                { x: 2, y: 2 },
                { x: 2, y: 1 },
                { x: 1, y: 0 },
            ],
        },
        {
            name: "Blinker",
            created: new Date().getMilliseconds(),
            grid: [
                { x: 0, y: 1 },
                { x: 1, y: 1 },
                { x: 2, y: 1 },
            ],
        },
        {
            name: "Beacon",
            created: new Date().getMilliseconds(),
            grid: [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 3, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 3 },
            ],
        },
        {
            name: "Toad",
            created: new Date().getMilliseconds(),
            grid: [
                { x: 1, y: 1 },
                { x: 2, y: 1 },
                { x: 3, y: 1 },
                { x: 0, y: 2 },
                { x: 1, y: 2 },
                { x: 2, y: 2 },
            ],
        },
        {
            name: "Pulsar",
            created: new Date().getMilliseconds(),
            grid: [
                { x: 2, y: 0 },
                { x: 3, y: 0 },
                { x: 4, y: 0 },
                { x: 8, y: 0 },
                { x: 9, y: 0 },
                { x: 10, y: 0 },
                { x: 0, y: 2 },
                { x: 5, y: 2 },
                { x: 7, y: 2 },
                { x: 12, y: 2 },
                { x: 0, y: 3 },
                { x: 5, y: 3 },
                { x: 7, y: 3 },
                { x: 12, y: 3 },
                { x: 0, y: 4 },
                { x: 5, y: 4 },
                { x: 7, y: 4 },
                { x: 12, y: 4 },
                { x: 2, y: 5 },
                { x: 3, y: 5 },
                { x: 4, y: 5 },
                { x: 8, y: 5 },
                { x: 9, y: 5 },
                { x: 10, y: 5 },
                { x: 2, y: 7 },
                { x: 3, y: 7 },
                { x: 4, y: 7 },
                { x: 8, y: 7 },
                { x: 9, y: 7 },
                { x: 10, y: 7 },
                { x: 0, y: 8 },
                { x: 5, y: 8 },
                { x: 7, y: 8 },
                { x: 12, y: 8 },
                { x: 0, y: 9 },
                { x: 5, y: 9 },
                { x: 7, y: 9 },
                { x: 12, y: 9 },
                { x: 0, y: 10 },
                { x: 5, y: 10 },
                { x: 7, y: 10 },
                { x: 12, y: 10 },
                { x: 2, y: 12 },
                { x: 3, y: 12 },
                { x: 4, y: 12 },
                { x: 8, y: 12 },
                { x: 9, y: 12 },
                { x: 10, y: 12 },
            ]
        },
        {
            name: "Glider Gun",
            created: new Date().getMilliseconds(),
            grid: [
                { x: 0, y: 4 },
                { x: 1, y: 4 },
                { x: 0, y: 5 },
                { x: 1, y: 5 },
                { x: 10, y: 4 },
                { x: 10, y: 5 },
                { x: 10, y: 6 },
                { x: 11, y: 3 },
                { x: 11, y: 7 },
                { x: 12, y: 2 },
                { x: 12, y: 8 },
                { x: 13, y: 2 },
                { x: 13, y: 8 },
                { x: 14, y: 5 },
                { x: 15, y: 3 },
                { x: 15, y: 7 },
                { x: 16, y: 4 },
                { x: 16, y: 5 },
                { x: 16, y: 6 },
                { x: 17, y: 5 },
                { x: 20, y: 2 },
                { x: 20, y: 3 },
                { x: 20, y: 4 },
                { x: 21, y: 2 },
                { x: 21, y: 3 },
                { x: 21, y: 4 },
                { x: 22, y: 1 },
                { x: 22, y: 5 },
                { x: 24, y: 0 },
                { x: 24, y: 1 },
                { x: 24, y: 5 },
                { x: 24, y: 6 },
                { x: 34, y: 2 },
                { x: 34, y: 3 },
                { x: 35, y: 2 },
                { x: 35, y: 3 },
            ]
        }
    ]
</script>

<div class="flex flex-col overflow-auto grow">
    {#each savedGrids as grid}
        {@const leftMost = grid.grid.reduce((prev, curr) => curr.x < prev.x ? curr : prev).x}
        {@const rightMost = grid.grid.reduce((prev, curr) => curr.x > prev.x ? curr : prev).x}
        {@const topMost = grid.grid.reduce((prev, curr) => curr.y < prev.y ? curr : prev).y}
        {@const bottomMost = grid.grid.reduce((prev, curr) => curr.y > prev.y ? curr : prev).y}

        <button class="flex items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-neutral-800 shrink-0" on:click={() => { loadSaved(grid.grid) }}>
            <svg viewBox="{leftMost} {topMost} {rightMost + 1} {bottomMost + 1}" class="w-20 h-20 p-2 shadow-md bg-neutral-700 ">
                {#each grid.grid as cell}
                    <rect
                        x={cell.x}
                        y={cell.y}
                        width="1"
                        height="1"
                        fill="white"
                    />
                {/each}
            </svg>
            <div>
                <h3 class="text-xl font-semibold">{grid.name}</h3>
                <!-- <p class="text-sm text-neutral-400">{new Date(grid.created).toUTCString()}</p> -->
            </div>
        </button>
    {/each}
</div>