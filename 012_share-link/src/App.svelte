<script lang="ts">
  import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
  import { share_links } from './stores';
  import HtmlCode from './ViewTypes/HTML-Code.svelte';
  import TextInput from './Text-Input.svelte';
  import { createPersistentStore } from './stores';
  import { onMount } from 'svelte';
  import CopyButton from './Copy-Button.svelte';

  let title = createPersistentStore('title', 'My message');
  let url = createPersistentStore('url', 'https://example.com');
  let encode_urls = createPersistentStore('encode_urls', false);
  let add_url_to_title_text = createPersistentStore('add_url_to_title_text', false);

  let full_width = createPersistentStore('full_width', false);

  let current_tab = createPersistentStore('current_tab', 1);
  let tabs_component: Tabs;

  onMount(() => {
    console.log(tabs_component.$$.after_update);

    tabs_component.$$.after_update.push(() => {
      const all_tabs_nl = document.querySelectorAll('.svelte-tabs__tab');
      const current_tab_node = document.querySelector('.svelte-tabs__selected');

      console.log('all_tabs', all_tabs_nl);
      console.log('current_tab', current_tab_node);

      const all_tabs_arr = Array.from(all_tabs_nl);

      // @ts-ignore
      $current_tab = all_tabs_arr.indexOf(current_tab_node);
    });
  });

  $: {
    $share_links.forEach((SoMe) => {
      SoMe.composed_url = SoMe.url;

      if ($add_url_to_title_text && !SoMe.url.includes('{url}')) {
        SoMe.composed_url = SoMe.url.replace('{title}', `${$title}: ${$url}`);
      } else {
        SoMe.composed_url = SoMe.url.replace('{title}', $title);
      }

      SoMe.composed_url = SoMe.composed_url.replace('{url}', $url);

      if ($encode_urls) SoMe.composed_url = encodeURI(SoMe.composed_url);
    });

    $share_links = $share_links;
  }
</script>

<div class="flex flex-col h-screen overflow-hidden bg-neutral-900 text-neutral-300">
    <div class="flex gap-4 px-4 py-2 text-xs">
      <div>
        App Settings
      </div>

      <label for="full_width" class="flex items-center gap-1">
        <input type="checkbox" id="full_width" bind:checked={$full_width} class="p-2 bg-neutral-800" />
        Full width
      </label>
    </div>
    
    <div class="flex flex-col mx-auto overflow-hidden {$full_width ? 'w-full': 'max-w-5xl border border-neutral-600'}">

      <div class="grid grid-cols-2 px-4 pb-2 border-b gap-x-2 gap-y-2 border-b-neutral-600">

        <TextInput id='title' bind:text={ $title } label="Title text" />

        <TextInput id='url' bind:text={ $url } label="URL" />
        
        <label for="encode_urls" class="flex justify-between whitespace-nowrap button">
          <div>Encode URL</div>
          <input type="checkbox" id="encode_urls" bind:checked={$encode_urls} class="p-2 bg-neutral-800" />
        </label>
        
        <label for="add_url_to_title_text" class="flex justify-between whitespace-nowrap button" title="if there is not dedicated field for the url, for example in WhatsApp.">
          <div>
            <div>Add URL to Title text</div>
          </div>
          <input type="checkbox" id="add_url_to_title_text" bind:checked={$add_url_to_title_text} class="p-2 bg-neutral-800" />
        </label>

      </div>

      <div class="overflow-auto grow">
        <Tabs initialSelectedIndex={$current_tab} bind:this={ tabs_component }>
          <TabList>
            <Tab>Single Links</Tab>
            <Tab>Simple text</Tab>
            <Tab>HTML Links</Tab>
          </TabList>
        
          <TabPanel>
            <div class="divide-y divide-neutral-800">
              {#each $share_links as SoMe}
                <div class="flex w-full px-4 pt-2">
                  <a href={SoMe.composed_url} class="flex items-center grow" target="_blank">
                    <div class="flex items-center gap-4 min-w-60">
                      <div class="w-5 h-5" style="background-color: {SoMe?.color ?? '#000'};"></div>
                      <div>{ SoMe.name }</div>
                    </div>
                  </a>
                  
                  <CopyButton text={SoMe.composed_url} />
                </div>

                <div class="px-4 pb-2 overflow-hidden text-xs whitespace-nowrap text-ellipsis opacity-30 max-w-[100%]">{ SoMe.composed_url }</div>
              {/each}
            </div>
          </TabPanel>
        
          <TabPanel>
            <pre class="p-4 font-mono text-xs whitespace-nowrap">
              {#each $share_links as SoMe}
                <div>{SoMe.composed_url}</div>
              {/each}
            </pre>
          </TabPanel>
          
          <TabPanel> <HtmlCode/> </TabPanel>
        </Tabs>
      </div>

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

  :global(.svelte-tabs__tab-panel) {
    margin: 0;
  }
</style>