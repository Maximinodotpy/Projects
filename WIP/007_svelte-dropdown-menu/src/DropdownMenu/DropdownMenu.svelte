<script context="module" lang="ts">
    interface IMenuItemBase {
        label: string;
        close_on_click?: boolean;
    }

    interface IMenuItemAction extends IMenuItemBase {
        label: string;
        action?: () => void;
        close_on_click?: boolean;
    }

    interface ISubMenuItem extends IMenuItemBase {
        items: Items;
    }

    export type Items = Array<
        ISubMenuItem | Array<IMenuItemAction|ISubMenuItem> | IMenuItemAction
    >;
</script>

<script lang="ts">
    import { getContext, onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { autoUpdate, computePosition, offset, shift, type Placement, flip } from '@floating-ui/dom'
    import type { IMenuGroupInfo } from "./DropdownMenuGroup.svelte";
    import DropdownMenuGroup from "./DropdownMenuGroup.svelte";

    const my_id = crypto.randomUUID();

    export let title: string = "Menu";
    export let menu_placement: Placement = "bottom-start";
    export let is_sub_menu = false;
    export let items: Items = [];
    let groups: (IMenuItemAction|ISubMenuItem)[][] = [];
    $: {
        groups = items.map((item) => {
            if (Array.isArray(item)) {
                return item;
            } else {
                return [item];
            }
        });
    }

    let menuPanel: HTMLElement
    let menuButton: HTMLElement
    let showPanel = false;

    let MenuGroupInfo = getContext<Writable<IMenuGroupInfo>>("MenuGroupInfo");

    if (MenuGroupInfo && !is_sub_menu) {

        console.log(title);
        console.log(MenuGroupInfo);
        console.log($MenuGroupInfo);
        console.log('-----');
        
        $MenuGroupInfo.menus.push(my_id);

        MenuGroupInfo.subscribe((value) => {
            if (value !== my_id) {
                showPanel = false;
            }
        });
    }

    function togglePanel(force: boolean = undefined) {
        if (force !== undefined) {
            showPanel = force;
        } else {
            showPanel = !showPanel;
        }

        /* if (current_menu) {
            showPanel ? current_menu.set(my_id) : current_menu.set(-1);
        } */
    }

    function buttonHover() {
        /* if (current_menu) {
            if ($current_menu != -1) {
                togglePanel(true);
            }
        } */
    }

    onMount(() => {
        // Stop this in case the menu panel does not exist onDestroy
        autoUpdate(menuButton, menuPanel, () => {
            computePosition(
                menuButton,
                menuPanel,
                {
                    placement: menu_placement,
                    middleware: [
                        offset(15),
                        shift(),
                        flip(),
                    ],
                },
            ).then(({ x, y }) => {
                Object.assign(menuPanel.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });
            })
        })
    })
</script>

<svelte:body on:click={() => { togglePanel(false) }}/>

<button on:click|stopPropagation={() => { togglePanel() }} on:pointermove={() => { buttonHover() }} bind:this={menuButton} class:submenu_button={is_sub_menu}>
    { title }

    {#if is_sub_menu}
        <span class="arrow">▶</span>
    {/if}
</button>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={menuPanel} class="menu-panel" class:hidden={!showPanel} on:click|stopPropagation={() => {}}>
    <DropdownMenuGroup>
        {#each groups as group, i}
            {#each group as button}
                {#if 'items' in button}
                    <svelte:self items={button.items} title={button.label} is_sub_menu={true} menu_placement="right-start" />
                {:else}
                    <button>{ button.label }</button>
                {/if}
            {/each}
    
            {#if groups.length != i + 1}
                <div class="divider"></div>
            {/if}
        {/each}
    </DropdownMenuGroup>
</div>

<style>
    .menu-panel {
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 120px;
        background-color: var(--bg-color, #222);
        border: var(--panel-border, 1px solid #444);
        border-radius: var(--panel-radius, 10px);
        box-shadow: 0 3px 10px hsl(0, 0%, 0%);
        display: flex;
        flex-direction: column;
    }

    .menu-panel.hidden {
        pointer-events: none;
        opacity: 0;
    }

    .menu-panel :is(button, .group_title) {
        padding: var(--panel-button-padding, 7px 15px);
        border: none;
        background-color: transparent;
        color: var(--text-color, #fff);
        text-align: left;
        border-radius: var(--panel-button-radius, 8px);
        margin: 2px 10px;
        box-sizing: border-box;
    }

    .menu-panel :is(button:first-child, .group_title:first-child) {
        margin-top: 10px;
    }
    .menu-panel :is(button:last-child, .group_title:last-child) {
        margin-bottom: 10px;
    }

    .menu-panel .divider {
        width: 100%;
        border-bottom: 1px solid #444;
        margin: 5px 0;
    }
    
    .menu-panel button:hover {
        background-color: var(--panel-button-hover-color, #333);
    }

    .submenu_button {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }
</style>