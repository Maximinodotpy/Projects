<script lang="ts">
  import Timeline from "./Timeline.svelte";
  import People from "./People.svelte";
  import IntermissionImage from "./Intermission_Image.svelte";
  import Gallery from "./Gallery.svelte";

  import { scrollProgress } from "./stores";


  const links = [
    'https://atomicarchive.com/resources/documents/oppenheimer/index.html',
    'https://atomicarchive.com/resources/documents/index.html',
    'https://www.lanl.gov/',
  ]

</script>


<div class="bg-neutral-900">
  <div>
    <div class="fixed px-4 py-2 backdrop-blur-md bg-neutral-800/50 text-white z-10 w-full transition-all { $scrollProgress.stuck && !($scrollProgress.progress == 1) ? 'translate-y-0': '-translate-y-full' }" id="s ">
      <div class="text-xl flex justify-between max-w-6xl mx-auto">
        <h1 class="">OPPENHEIMER</h1>

        <div class="flex gap-4">
          <a href="#people">People</a>
          <a href="#timeline">Timeline</a>
        </div>
      </div>
    </div>

    <div class="h-screen relative">
      <img src="https://thebulletin.org/wp-content/uploads/2023/07/oppenheimer-gadget-silhouette.png" alt="" class="w-full h-full overflow-hidden object-cover">
      
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900"></div>
      
      <div class="absolute bottom-[13%] w-full right-0 text-white flex justify-center">
        <div class="flex flex-col items-center">
          <h1 class="text-6xl font-bold">OPPENHEIMER</h1>
          <p class="italic text-2xl">1904 - 1967</p>
        </div>
      </div>
    </div>
  </div>
  
  <People />
  
  <IntermissionImage url="https://upload.wikimedia.org/wikipedia/commons/0/07/Trinity_100ton_Test.gif" />
  
  <div class="bg-neutral-900 py-12">
    <div class="container">
      <h2>Links</h2>
      
      <div class="grid md:grid-cols-2 gap-2">
        {#each links as link}
        <a href={link} class="btn-dark whitespace-nowrap text-ellipsis overflow-hidden" target="_blank">{link}</a>
        {/each}
      </div>
    </div>
  </div>
  
  <IntermissionImage url="https://upload.wikimedia.org/wikipedia/commons/f/f4/TrinityFireballGif.gif" />

  <Gallery />
  
  <Timeline />
</div>