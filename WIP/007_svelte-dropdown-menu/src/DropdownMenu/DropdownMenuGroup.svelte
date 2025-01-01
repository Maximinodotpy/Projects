<script context="module" lang="ts">
    export interface IMenuGroupInfo {
        current_id: string;
        menus: Array<string>;
    }
</script>

<script lang="ts">
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    const current_panel = writable<IMenuGroupInfo>({ current_id: '', menus: [] });

    setContext("MenuGroupInfo", current_panel);
</script>

<slot />
