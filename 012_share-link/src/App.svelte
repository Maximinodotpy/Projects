<script lang="ts">
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';

  let title = 'My message';
  let url = 'https://www.example.com';
  let encode_urls = false;

  let share_links = [
    {
      name: 'Facebook',
      url: 'https://threema.id/compose?text={title}',
      composed_url: '',
      color: '#1877F2',
    },
    {
      name: 'Threema',
      url: 'https://t.me/share/url?url={url}&text={title}',
      composed_url: '',
      color: '#05A63F',
    },
    {
      name: 'WhatsApp',
      url: 'https://api.whatsapp.com/send?text={title}',
      composed_url: '',
      color: '#25D366',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/intent/tweet?text={title}&url={url}',
      composed_url: '',
      color: '#1DA1F2',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
      composed_url: '',
      color: '#0A66C2',
    },
    {
      name: 'Pinterest',
      url: 'https://pinterest.com/pin/create/button/?url={url}&description={title}',
      composed_url: '',
      color: '#E60023',
    },
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/submit?url={url}&title={title}',
      composed_url: '',
      color: '#FF4500',
    },
    {
      name: 'Viber',
      url: 'viber://forward?text={title}',
      composed_url: '',
      color: '#665CAC',
    },
    {
      name: 'Email',
      url: 'mailto:?subject={title}&body={url}',
      composed_url: '',
    },
  ];

  $: {
    share_links.forEach((SoMe) => {
      SoMe.composed_url = SoMe.url;

      SoMe.composed_url = SoMe.url.replace('{title}', title);
      SoMe.composed_url = SoMe.composed_url.replace('{url}', url);
    });

    share_links = share_links;
  }
</script>

<div class="bg-neutral-900 min-h-screen text-neutral-300">
    <div class="max-w-4xl mx-auto border-x min-h-screen border-neutral-600">

      <div class="p-4 border-b border-b-neutral-600 grid grid-cols-2 gap-8">
        
        <div>
          <label for="title" class="mb-3 block font-bold text-xl">Title text</label>
          <input type="text" id="title" bind:value={title} class="bg-neutral-800 p-2" />
        </div>

        <div>
          <label for="url" class="mb-3 block font-bold text-xl">URL text</label>
          <input type="text" id="url" bind:value={url} class="bg-neutral-800 p-2" />
        </div>
        
        <div class="flex items-center w-full justify-between">
          <label for="url" class="block font-bold whitespace-nowrap">Encode URL</label>
          <input type="checkbox" id="encode_urls" bind:checked={encode_urls} class="bg-neutral-800 p-2" />
        </div>

      </div>

      <Tabs>
        <TabList>
          <Tab>Single Links</Tab>
          <Tab>Simple text</Tab>
        </TabList>
      
        <TabPanel>
          <div class="divide-y divide-neutral-800">
            {#each share_links as SoMe}
              <a href={SoMe.composed_url} class="flex justify-between p-4" target="_blank">
                <div class="flex gap-4 items-center">
                  <div class="w-5 h-5" style="background-color: {SoMe?.color ?? '#000'};"></div>
                  <div>{ SoMe.name }</div>
                </div>
    
                <div class="max-w-[80%] overflow-hidden whitespace-nowrap text-ellipsis opacity-30">{ SoMe.composed_url }</div>
              </a>
            {/each}
          </div>
        </TabPanel>
      
        <TabPanel>
          <div class="p-4 font-mono">
            {#each share_links as SoMe}
              <div>{SoMe.composed_url}</div>
            {/each}
          </div>
        </TabPanel>
      </Tabs>

    </div>
</div>

<style>
  :global(.svelte-tabs li.svelte-tabs__tab) {
    color: inherit;
  }
  :global(.svelte-tabs__tab-list) {
    border-bottom: 1px solid rgb(82 82 82) !important;
  }

  :global(.svelte-tabs li.svelte-tabs__selected) {
    color: inherit;
    border-bottom: 2px solid #fff !important;
  }
</style>