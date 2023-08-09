<script lang="ts">
    import DropdownMenu from "./DropdownMenu/DropdownMenu.svelte";
    import DropdownMenuGroup from "./DropdownMenu/DropdownMenuGroup.svelte";
    import type { Items } from "./DropdownMenu/DropdownMenu.svelte";

    const menu_items: { top_level_name: string, items: Items }[] = [
  {
    "top_level_name": "File",
    "items": [
      { "label": "New" },
      { "label": "Open" },
      { "label": "Save" },
      { "label": "Save As..." },
      { "label": "Close" },
      {
        "label": "Close Folder",
        "items": [
          { "label": "Close All Editors" },
          { "label": "Close Other Editors" }
        ]
      },
      { "label": "Exit" }
    ]
  },
  {
    "top_level_name": "Edit",
    "items": [
      { "label": "Undo" },
      { "label": "Redo" },
      { "label": "Cut" },
      { "label": "Copy" },
      { "label": "Paste" },
      {
        "label": "Selection",
        "items": [
          { "label": "Select All" },
          { "label": "Expand Selection" },
          { "label": "Shrink Selection" }
        ]
      }
    ]
  },
  {
    "top_level_name": "View",
    "items": [
      { "label": "Explorer" },
      { "label": "Search" },
      { "label": "Source Control" },
      { "label": "Debug" },
      { "label": "Extensions" },
      { "label": "Output" },
      { "label": "Terminal" }
    ]
  },
  {
    "top_level_name": "Help",
    "items": [
      { "label": "Documentation" },
      { "label": "Keyboard Shortcuts" },
      { "label": "Release Notes" },
      { "label": "Welcome" }
    ]
  }
];
</script>

<div class="app">
    <DropdownMenu title="Single" items={menu_items[0].items}/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    
    <div style="display: flex">
        <DropdownMenuGroup>
            <!-- Loop over my menu items and add them -->
            {#each menu_items as menu_item}
                <DropdownMenu title={menu_item.top_level_name} items={menu_item.items} />
            {/each}
        </DropdownMenuGroup>
    </div>
    
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    <div style="display: flex">
        
    </div>
    
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
</div>


<style>
    .app {
        min-height: 100vh;
        background-color: hsl(0, 0%, 10%);
    }
</style>