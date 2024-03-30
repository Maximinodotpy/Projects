<script lang="ts">

    import { share_links } from '../stores';
    import { custom_share_links } from '../stores';
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';

    const NEW_APP = {
        name: 'Custom App',
        url: 'https://example.com?share={url}',
        color: '#000000',
        enabled: false,
        logo: 'https://placehold.co/400x400?text=Logo',
    };


    function add_custom_share_link() {
        $custom_share_links = [...$custom_share_links, { ...NEW_APP }];
    }

    function remove_custom_share_link(index: number) {
        $custom_share_links = $custom_share_links.filter((_, i) => i !== index);
    }

    function toggle_all_defaults() {    
        // Find the state of the first SoMe
        const first_enabled = $share_links[0].enabled;

        $share_links = $share_links.map((SoMe) => ({ ...SoMe, enabled: !first_enabled }));
    }

    // A function that will ask the user to either give a url to a image or to upload one
    function ask_for_image_url(index: number) {
        const url = prompt('Please enter the URL of the image');

        if (url) {
            $custom_share_links[index].logo = url;
        }
    }

</script>

<div class="h-full p-4 overflow-auto" >
    <!-- Render apps as table -->

    <table class="w-full">
        <thead>
        <tr>
            <th class="p-2 text-center">
                <!-- Show icons depending wether all, none, or some are selected -->
                {#if $share_links.every(SoMe => SoMe.enabled)}
                    <button on:click={toggle_all_defaults}>⬜</button>
                {:else if $share_links.some(SoMe => SoMe.enabled)}
                    <button on:click={toggle_all_defaults}>🔳</button>
                {:else}
                    <button on:click={toggle_all_defaults}>⬛</button>
                {/if}
            </th>
            <th class="p-2 text-left">App</th>
            <th class="p-2 text-left" colspan="3">URL</th>
        </tr>
        </thead>
        <tbody>
        {#each $share_links as SoMe}
            <tr>
                <td class="relative">
                    <label class="absolute top-0 left-0 flex justify-center w-full h-full" for="enabled-{SoMe.name}">
                        <input type="checkbox" id="enabled-{SoMe.name}" bind:checked={SoMe.enabled} />
                    </label>
                </td>
                <td>
                    <div class="flex items-center gap-2 p-2">
                        <div class="w-4 h-4 border border-neutral-700" style="background-color: {SoMe.color};"></div>
                        {SoMe.name}
                    </div>
                </td>
                <td class="p-2" colspan="3">{SoMe.url}</td>
            </tr>
        {/each}

        <tr>
            <td colspan="5" class="p-2">
                <h2 class="mb-1 font-bold">Custom Apps</h2>
                <p class="text-neutral-200/50">Here you can add custom share links, use the <code>{'{url}'}</code> and <code>{'{title}'}</code> placeholders</p>
            </td>
        </tr>

        <!-- Loop over all the custom share links -->
        {#each $custom_share_links as SoMe, index (SoMe)}
            <tr animate:flip={{ duration: 250, easing: quintOut }}>
                <td class="relative">
                    <label class="absolute top-0 left-0 flex justify-center w-full h-full" for="enabled-{SoMe.name}">
                        <input type="checkbox" id="enabled-{SoMe.name}" bind:checked={SoMe.enabled} />
                    </label>
                </td>
                <td>
                    <div class="flex items-center gap-2 pl-2">
                        <div class="flex items-center py-2">
                            <input type="color" name="" id="" class="w-[16px!important] h-[16px!important] shrink-0 p-0 m-0 border border-neutral-700" bind:value={SoMe.color}>
                        </div>

                        <input type="text" bind:value={SoMe.name} class="py-2 grow">
                    </div>
                </td>
                <td>
                    <input type="text" class="w-full p-2 font-mono" bind:value={SoMe.url} />
                </td>

                <td on:pointerdown={() => { ask_for_image_url(index) }}>
                    <div class="flex items-center">
                        <img src="{SoMe.logo}" alt="" class="object-cover w-4 h-4 aspect-square grow">
                    </div>
                </td>

                <td>
                    <button on:click={() => remove_custom_share_link(index)} class="w-full h-full">❌</button>
                </td>
            </tr>
        {/each}

        <tr>
            <td colspan="5" class="p-2 text-center bg-green-500/10" on:pointerdown={add_custom_share_link}>Add custom app</td>
        </tr>

        </tbody>
    </table>
</div>

<style>
    table, th, td {
        border: 1px solid hsl(0, 0%, 30%);
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    input[type="color" i]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color" i]::-webkit-color-swatch {
        border: none;
    }
</style>