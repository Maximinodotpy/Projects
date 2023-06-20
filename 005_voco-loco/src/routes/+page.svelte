<script lang="ts">
    import { base } from "$app/paths";
    import type { VociFile } from "$lib/edit_modes/word_type";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    const voci_file = getContext<Writable<VociFile>>("voci_file");
</script>

<div class="flex flex-col h-full">
    <div class="p-4 px-8 grow">
        <div class="max-w-3xl mx-auto">
            <h1 class="text-4xl">Loco Voco</h1>
        </div>
    </div>
    <div class="p-4 px-8 grow">
        <div class="max-w-3xl mx-auto">
            <h2 class="mb-4 text-2xl">Import</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae laboriosam illum debitis inventore exercitationem tenetur maiores in necessitatibus officiis, quaerat odio soluta, repudiandae iure autem fugiat maxime reiciendis distinctio.</p>
            <button class="inline-block px-2 py-1 mt-3 bg-blue-200 rounded-md" on:click={$voci_file.openFile}>Import Now</button>

        </div>
    </div>
    <div class="p-4 px-8 grow">
        <div class="max-w-3xl mx-auto">
            <h2 class="mb-4 text-2xl">Edit</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae laboriosam illum debitis inventore exercitationem tenetur maiores in necessitatibus officiis, quaerat odio soluta, repudiandae iure autem fugiat maxime reiciendis distinctio.</p>
            <a class="inline-block px-2 py-1 mt-3 bg-blue-200 rounded-md" href={`${base}/edit`}>Edit now</a>
        </div>
    </div>
    <div class="p-4 px-8 grow">
        <div class="max-w-3xl mx-auto">
            <h2 class="mb-4 text-2xl">Learn</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi beatae laboriosam illum debitis inventore exercitationem tenetur maiores in necessitatibus officiis, quaerat odio soluta, repudiandae iure autem fugiat maxime reiciendis distinctio.</p>
            <a class="inline-block px-2 py-1 mt-3 bg-blue-200 rounded-md" href={`${base}/learn`}>Learn now</a>
        </div>
    </div>
</div>