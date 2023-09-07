<script lang="ts">
  import panzoom from 'panzoom';
  import { onMount } from 'svelte';

  let panZoomInstance = null;

  interface FileListItem {
    file: File;
    dataUrl: string;
  }

  let openFiles: FileListItem[] = [];
  let currentFileIndex = 0;

  onMount(() => {
    panZoomInstance = panzoom(document.querySelector('#image'), {
      bounds: true
    })

    let wasLaunched = false;

    if (window.launchQueue) {
      launchQueue.setConsumer((launchParams) => {
        wasLaunched = true
        handleFiles(launchParams.files)
      })
    }

    setTimeout(() => {
      if (!wasLaunched) {
        openFiles.push({
          file: new File([], 'Start.jpg'),
          dataUrl: 'https://maximmaeder.com/wp-content/uploads/2022/10/PB_Levin-150x150.png'
        })

        openFiles = openFiles;
      }
    }, 100)
  })

  function handleFiles(files: FileSystemFileHandle[]) {
    files.forEach(async (file) => {
      const realFile = await file.getFile()

      openFiles.push({
        file: realFile,
        dataUrl: URL.createObjectURL(realFile)
      })

      openFiles = openFiles
    })
  }

  async function openNewFiles() {
    const fileTypeOptions = {
      types: [
        {
          description: 'Image Files',
          accept: {
            'image/jpeg': [ '.jpg', '.jpeg' ],
            'image/png': [ '.png' ],
          }
        }
      ],
      multiple: true,
    }

    let files = await window.showOpenFilePicker(fileTypeOptions);

    handleFiles(files)
  }

</script>

<div class="h-screen bg-neutral-800 text-neutral-100">
  <div class="absolute w-full h-full overflow-hidden grow">
    <img 
      src="{openFiles[currentFileIndex]?.dataUrl || ''}" alt="" id="image">
  </div>

  <div class="w-[500px] p-6 absolute right-0">
    <div class="px-8 py-6 bg-neutral-900/50 rounded-2xl">
      <h1 class="mb-4">{openFiles[currentFileIndex]?.file.name}</h1>

      <div class="flex justify-between mb-2">
        <p>Size</p>
        <p>{openFiles[currentFileIndex]?.file.size}</p>
      </div>
      <div class="flex justify-between mb-2">
        <p>Type</p>
        <p>{openFiles[currentFileIndex]?.file.type}</p>
      </div>
      <div class="flex justify-between mb-2">
        <p>Modified</p>
        <p>{new Date(openFiles[currentFileIndex]?.file.lastModified).toDateString()}</p>
      </div>
    </div>
  </div>

  <div class="absolute bottom-0 w-full p-6 overflow-hidden">
    <div class="flex px-5 py-3 bg-neutral-900/50 rounded-2xl">
      <div class="flex gap-3 grow">
        {#each openFiles as file, i}
          <button on:click={() => {
            currentFileIndex = i
          }}>
            <img src="{file.dataUrl}" alt="" class="h-[80px] rounded-xl border-2 { i == currentFileIndex ? 'border-white' : 'border-transparent' }">
          </button>
        {/each}
        <!-- Loop with Images -->
      </div>
      <button class="h-[80px] bg-neutral-800 px-6 rounded-xl" on:click={openNewFiles}>Open</button>
    </div>
  </div>
</div>