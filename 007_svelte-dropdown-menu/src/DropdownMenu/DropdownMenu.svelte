<script context="module" lang="ts">
    let id = 0;
</script>

<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { onMount } from "svelte";

    const my_id = id++;

    interface IMenuItem {
        label: string;
        action: () => void;
        close_on_click?: boolean;
    }

    export let title: string = "Menu";
    export let items: Array<IMenuItem | "divider"> = [];

    let menuPanel: HTMLElement
    let menuButton: HTMLElement
    let showPanel = false;

    let window_width = 0;

    let current_menu = getContext<Writable<number>>("current_menu");

    if (current_menu) {
        current_menu.subscribe((value) => {
            if (value !== my_id) {
                showPanel = false;
            }
        });
    }

    onMount(() => {
        window.addEventListener('resize', ensurePosition)
    })

    function ensurePosition() {
        window.requestAnimationFrame(() => {
            if (!showPanel) return;
            if (!menuPanel) return;

            const menuButtonRect = menuButton.getBoundingClientRect();
            const menuPanelRect = menuPanel.getBoundingClientRect();

            let x_offset = window_width - (menuButtonRect.x + menuPanelRect.width);

            if (x_offset < 0) {
                menuPanel.style.translate = `${x_offset}px`;
            } else {
                menuPanel.style.translate = ``;
            }
        });
    }

    function togglePanel(force: boolean = undefined) {
        if (force !== undefined) {
            showPanel = force;
        } else {
            showPanel = !showPanel;
        }

        if (showPanel) {
            ensurePosition();
        }

        if (current_menu) {
            showPanel ? current_menu.set(my_id) : current_menu.set(-1);
        }
    }

    function buttonHover() {
        if (current_menu) {
            if ($current_menu != -1) {
                togglePanel(true);
            }
        }
    }

</script>

<svelte:body on:click={() => { togglePanel(false) }}/>
<svelte:window bind:innerWidth={window_width} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click|stopPropagation={() => {}}>
    <button on:click={() => { togglePanel() }} on:pointermove={() => { buttonHover() }} bind:this={menuButton}>{ title }</button>

    <div bind:this={menuPanel} class="menu-panel" style="display: {showPanel ? 'flex': 'none'}">
        {#each items as item}
            {#if item == 'divider'}
                <div class="divider"></div>
            {:else}
                <button on:click={() => { item?.action(); item?.close_on_click ?? true ? togglePanel(false) : '' }}>{ item.label }</button>
            {/if}
        {/each}
    </div>
</div>

<style>
    .menu-panel {
        position: absolute;
        background-color: var(--bg-color, #222);
        max-width: 100%;
        min-width: var(--panel-width, 200px);
        border: var(--panel-border, 1px solid #444);
        border-radius: var(--panel-radius, 10px);
        /* padding: var(--panel-padding, 5px); */
        overflow: hidden;
        box-shadow: 0 3px 10px hsl(0, 0%, 0%);
        display: flex;
        flex-direction: column;
    }

    .menu-panel button {
        padding: var(--panel-button-padding, 7px 15px);
        border: none;
        background-color: transparent;
        color: var(--text-color, #fff);
        text-align: left;
        border-radius: var(--panel-button-radius, 8px);
        margin: 2px 10px;
        box-sizing: border-box;
    }

    .menu-panel button:first-child {
        margin-top: 10px;
    }
    .menu-panel button:last-child {
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
</style>