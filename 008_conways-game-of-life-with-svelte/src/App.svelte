<script lang="ts">
    import { onMount } from "svelte";
    import panzoom from "panzoom";
    import type { PanZoom } from "panzoom";
    import SavedGrids from "./savedGrids/SavedGrids.svelte";
    import savedGrids from "./savedGrids/savedGrids";

    enum GameState {
        Running,
        Paused,
        Editing,
    }

    let game_state: GameState = GameState.Editing;

    let gridSize = 30;
    let tickTime = 1000;

    let panable: SVGElement;
    let panableBox: DOMRect;
    let panInstance: PanZoom;

    // The grid is a list of alive cells
    let grid: ICell[] = [{ x: 0, y: 2 }];
    let savedGrid: ICell[] = [];

    function isCellAlive(x: number, y: number) {
        const isAlive = grid.some((cell) => cell.x == x && cell.y == y);
        return isAlive;
    }
    
    function toggleCell(x: number, y: number, force: boolean | undefined = undefined) {
        let target = force == undefined ? isCellAlive(x, y) : !force;

        if (target) {
            grid = grid.filter((cell) => cell.x !== x || cell.y !== y);
        } else {
            grid.push({ x, y });
        }

        // Update the panInstance to force a rerender
        panInstance = panInstance;
    }
    function determineFate(x: number, y: number, grid: ICell[]): boolean {
        const isAlive = isCellAlive(x, y);
        const aliveNeighbors = [
            isCellAlive(x - 1, y - 1),
            isCellAlive(x, y - 1),
            isCellAlive(x + 1, y - 1),
            isCellAlive(x - 1, y),
            isCellAlive(x + 1, y),
            isCellAlive(x - 1, y + 1),
            isCellAlive(x, y + 1),
            isCellAlive(x + 1, y + 1),
        ].filter((x) => x).length;

        if (isAlive) {
            if (aliveNeighbors == 2 || aliveNeighbors == 3) {
                return true;
            }
        } else {
            if (aliveNeighbors == 3) {
                return true;
            }
        }

        return false;
    }

    onMount(() => {
        panInstance = panzoom(panable, {
            maxZoom: 2,
            minZoom: 0.5,
            smoothScroll: false,
        });

        /* let i = 0;
        const REDRAW_INTERVAL = 20;

        panInstance.on("transform", (e) => {
            
            if (i % REDRAW_INTERVAL == 0) {
                panInstance = panInstance;
                console.log("transform", e);
            }
            
            i++;
        }); */

        // Also redraw every 500ms
        setInterval(() => {
            panInstance = panInstance;
        }, 500);
    });

    function startGame() {
        game_state = GameState.Running;

        savedGrid = [...grid];

        console.log("start game", savedGrid);

        tick();
    }

    function pauseGame() {
        grid = [...savedGrid];

        game_state = GameState.Editing;

        panInstance = panInstance;
    }

    function tick() {
        if (game_state != GameState.Running) return;

        let frozenGrid = [...grid];
        let finalGrid: ICell[] = [];

        // Find out all bordering Cells in current grid
        const borderingCells: ICell[] = [];
        for (const cell of frozenGrid) {
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (x == 0 && y == 0) continue;
                    if (isCellAlive(cell.x + x, cell.y + y)) continue;
                    // Avoid Duplicate Cells
                    if (borderingCells.some((c) => c.x == cell.x + x && c.y == cell.y + y)) continue;
                    borderingCells.push({ x: cell.x + x, y: cell.y + y });
                }
            }

            // Check if the current cell should survive
            const fate = determineFate(cell.x, cell.y, frozenGrid);
            
            if (fate) {
                finalGrid.push(cell);
            }
        }

        // Determine the fate of all bordering cells
        for (const cell of borderingCells) {
            const fate = determineFate(cell.x, cell.y, frozenGrid);
            if (fate) {
                finalGrid.push(cell);
            }
        }

        grid = finalGrid;

        panInstance = panInstance;
        
        if (game_state == GameState.Running) setTimeout(tick, tickTime);
    }

    function saveCurrentGrid() {
        if (grid.length == 0) return;

        $savedGrids.push({
            name: "New Grid",
            created: Date.now(),
            grid: [...grid],
        });

        $savedGrids = $savedGrids;
    }

    // Function that snaps a number to certain steps like 20
    function numberStep(value: number, step: number) {
        return Math.round(value / step) * step;
    }
</script>

<div class="flex flex-col h-screen overflow-hidden bg-neutral-800 text-neutral-200">
    <div class="flex items-center justify-between bg-neutral-900">
        <div class="px-3 py-2">Conway's Game of Life</div>
        <div class="px-3 py-2">
            Made By 
            <a href="https://maximmaeder.com/" target="_blank" class="underline">Maxim Mäder</a>
        </div>
    </div>
    
    <div class="flex overflow-hidden grow">
        <svg class="grow focus:outline-none" bind:contentRect={panableBox}>
            <g bind:this={panable}>
                <!-- OPTIMIZE THIS: Maybe not render anything when the pan is moving -->
                {#if panableBox && panInstance}
                    <!-- Find out the most leftern cell that should be visible and snap it to the grid -->
                    {@const currentZoom = panInstance.getTransform().scale}
                    {@const zoomedGridSize = gridSize * currentZoom}

                    {#each Array(Math.ceil((panableBox.width + zoomedGridSize) / zoomedGridSize) + 1) as _, x}
                        {#each Array(Math.ceil((panableBox.height + zoomedGridSize) / zoomedGridSize) + 1) as _, y}
                            {@const cellX =
                                numberStep(
                                    -panInstance.getTransform().x *
                                        (1 / currentZoom),
                                    gridSize
                                ) +
                                (x - 1) * gridSize}
                            {@const cellXIndex = cellX / gridSize}
                            {@const cellY =
                                numberStep(
                                    -panInstance.getTransform().y *
                                        (1 / currentZoom),
                                    gridSize
                                ) +
                                (y - 1) * gridSize}
                            {@const cellYIndex = cellY / gridSize}

                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <rect
                                x={cellX}
                                y={cellY}
                                width={gridSize}
                                height={gridSize}
                                class="{isCellAlive(cellXIndex, cellYIndex) ? 'fill-green-500 hover:fill-green-700': 'fill-transparent hover:fill-blue-700'}  stroke-neutral-700"
                                on:click={() => { toggleCell(cellXIndex, cellYIndex); }}
                                on:pointerenter={(e) => {
                                    if (e.ctrlKey && e.shiftKey) toggleCell(cellXIndex, cellYIndex, false);
                                    else if (e.ctrlKey) toggleCell(cellXIndex, cellYIndex, true);
                                }}
                            />
                        {/each}
                    {/each}
                {/if}
            </g>
        </svg>

        <div class="min-w-[300px] bg-neutral-900 flex flex-col h-full">
            <div class="px-6 mt-3 mb-3">
                {#if game_state == GameState.Editing}
                    <button class="block w-full py-2 rounded-md bg-neutral-800" on:click={startGame}>Start</button>
                {:else}
                    <button class="block w-full py-2 rounded-md bg-neutral-800" on:click={() => { pauseGame(); }}>Stop</button>
                {/if}
            </div>
            
            <div class="px-6 mb-4">

                <label for="tick_time" class="block my-3">
                    <div class="mb-2">Tick Time [ms]</div>
                    <input type="text" class="w-full px-3 py-2 rounded-md bg-neutral-800" bind:value={tickTime} disabled={game_state != GameState.Editing} id="tick_time">
                </label>
                
                <div class="flex gap-3">
                    <button class="block py-2 mt-3 text-xs rounded-md grow bg-neutral-800"on:click={() => { panInstance.moveTo(0, 0); }}>Reset Position</button>
                    <button class="block py-2 mt-3 text-xs rounded-md grow bg-neutral-800"on:click={() => { pauseGame(); grid = []; }}>Clear</button>
                    <button class="block py-2 mt-3 text-xs rounded-md grow bg-neutral-800"on:click={saveCurrentGrid}>Save Current Grid</button>
                </div>
            </div>


            <SavedGrids on:load_saved={(e) => {
                pauseGame();
                grid = [...e.detail.grid];
                panInstance = panInstance;
            }}/>
        </div>
    </div>
</div>
