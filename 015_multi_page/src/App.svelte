<script lang="">
  /* import { createSynchronizedStoreList } from "./stores"; */
  import { store } from "./store";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";

  let windowInfos = window;

  const id = crypto.randomUUID();

  // Position variables
  let global_x_0 = 0
  let global_y_0 = 0
  let windowWidth = 0
  let windowHeight = 0

  // Refreh the windowInfos object
  const refreshWindowInfos = () => {
    windowInfos = window;

    global_x_0 = -windowInfos.screenX;
    global_y_0 = -windowInfos.screenY;
    windowWidth = windowInfos.innerWidth;
    windowHeight = windowInfos.innerHeight;

    // @ts-ignore
    $store.obj[id].w = {
      screen_x: global_x_0,
      screen_y: global_y_0,
      width: windowWidth,
      height: windowHeight,
    };
  }

  // Refresh the windowInfos object every 1 second
  setInterval(refreshWindowInfos, 100);

  onMount(() => {
    console.log("App mounted");

    $store = $store;

    $store.obj[id] = {
      text: '0',
      w: {
        screen_x: global_x_0,
        screen_y: global_y_0,
        width: windowWidth,
        height: windowHeight,
      },
      color: `hsl(${Math.floor(Math.random() * 255)}, 50%, 50%)`,
    }
  });

  onDestroy(() => {
    console.log("App unmounted");
    $store = $store;
  });

  // Delete this object from the store when the window is closed
  function beforeUnload() {
    delete $store.obj[id];
    $store = $store;
  }
  
</script>

<svelte:window on:beforeunload={beforeUnload}/>

<svelte:head>
  <title>Multi Page</title>
</svelte:head>

<div class="h-screen bg-neutral-950">
  <!-- Loop over all the other shapes in the store and show them the relative to this window position -->
  {#each Object.keys($store.obj) as key}
    <div style="position: fixed; width: {$store.obj[key]?.w.width}px; height: {$store.obj[key]?.w.height}px; left: {-$store.obj[key].w.screen_x - windowInfos.screenX}px; top: {-$store.obj[key].w.screen_y - windowInfos.screenY}px" class="flex justify-center items-center">
      <div class="box" style="background-color: {$store.obj[key]?.color};"></div>
    </div>
  {/each}
</div>