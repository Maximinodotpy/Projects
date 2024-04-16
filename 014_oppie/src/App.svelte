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
    'https://outrider.org/',
    'https://outrider.org/nuclear-weapons/timelines/nuclear-history-world-war-ii',
    'https://www.history.navy.mil/content/history/museums/nmusn/search.html?q=nuclear&ts=false',
    'https://www.vice.com/en/article/gqkgp9/the-forgotten-victims-of-the-first-atomic-bomb',
    'https://beyondnuclearinternational.org/2018/07/16/dancing-in-the-dust-of-death/',
    'https://www.history.com/news/atomic-bomb-test-victims-new-mexico-downwinders',
  ]

</script>

<svelte:head>
  <title>Oppenheimer</title>
</svelte:head>


<div class="bg-neutral-900">
  <div>
    <div class="fixed px-4 py-2 backdrop-blur-md bg-neutral-800/50 text-white z-10 w-full transition-all { $scrollProgress.stuck && !($scrollProgress.progress >= 0.99) ? 'translate-y-0': '-translate-y-full' }" id="s ">
      <div class="flex justify-between max-w-6xl mx-auto text-xl">
        <h1 class="">OPPENHEIMER</h1>

        <div class="flex gap-4">
          <a href="#people">People</a>
          <a href="#gallery">Gallery</a>
          <a href="#timeline">Timeline</a>
          <!-- <div>{$scrollProgress.progress}</div> -->
        </div>
      </div>
    </div>

    <div class="relative h-screen">
      <img src="https://thebulletin.org/wp-content/uploads/2023/07/oppenheimer-gadget-silhouette.png" alt="" class="object-cover w-full h-full overflow-hidden">
      
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900"></div>
      
      <div class="absolute bottom-[13%] w-full right-0 text-white flex justify-center">
        <div class="flex flex-col items-center">
          <h1 class="text-6xl font-bold">OPPENHEIMER</h1>
          <p class="text-2xl italic">1904 - 1967</p>
        </div>
      </div>
    </div>
  </div>
  
  <People />
  
  <IntermissionImage url="https://upload.wikimedia.org/wikipedia/commons/0/07/Trinity_100ton_Test.gif" />
  
  <div class="py-12 bg-neutral-900">
    <div class="container">
      <h2>Links</h2>
      
      <div class="grid gap-2 md:grid-cols-2">
        {#each links as link}
        <a href={link} class="overflow-hidden btn-dark whitespace-nowrap text-ellipsis" target="_blank">{link}</a>
        {/each}
      </div>
    </div>
  </div>
  
  <IntermissionImage url="https://upload.wikimedia.org/wikipedia/commons/f/f4/TrinityFireballGif.gif" />

  <div id="gallery">
    <Gallery />
  </div>
  
  <Timeline />
</div>