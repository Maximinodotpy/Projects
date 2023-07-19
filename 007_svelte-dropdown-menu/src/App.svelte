<script lang="ts">
    import DropdownMenu from "./DropdownMenu/DropdownMenu.svelte";
    import DropdownMenuGroup from "./DropdownMenu/DropdownMenuGroup.svelte";

    const menu_items = [
        {
            label: "New",
            action: () => {
                console.log("New");
            },
            close_on_click: false,
        },
        {
            label: "Open",
            action: () => {
                console.log("Open");
            },
        },
        'divider',
        {
            label: "Export As ...",
        },
        {
            label: "PDF",
            action: () => {
                console.log("Save");
            },
        },
        {
            label: "SVG",
            action: () => {
                console.log("Close");
            },
        },
    ];
</script>

<div class="app">
    <DropdownMenu title="Single" items={menu_items}/>
    
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    
    <div style="display: flex">
        <DropdownMenuGroup>
            <DropdownMenu title="File" items={menu_items} />
            <DropdownMenu title="Selection" items={menu_items} />
            <DropdownMenu title="Help" items={menu_items} />
        </DropdownMenuGroup>
    </div>
    
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    <div style="display: flex">
        <DropdownMenuGroup>
            <DropdownMenu title="File" items={menu_items} />
            <DropdownMenu title="Selection" items={menu_items} />
            <DropdownMenu title="Help" items={menu_items} />
        </DropdownMenuGroup>
    </div>
    
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
</div>


<style>
    .app {
        min-height: 100vh;
        background-color: hsl(0, 0%, 10%);
    }
</style>