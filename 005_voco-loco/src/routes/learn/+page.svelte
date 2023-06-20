<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    import  { base } from '$app/paths';
</script>

<div class="max-w-5xl p-5 mx-auto">
    <h1 class="mb-10 text-3xl">Learning</h1>

    <div class="grid grid-cols-2 gap-10">

        {#each Array(4) as i}
            <div class="border-[1.5px]">
                <svg height="150" width="200" viewBox="0 0 200 100" class="aspect-[2/1] w-full stroke-neutral-300">
                    <rect class="rotate-[-15deg] translate-y-[30px]" x="0" width="100" height="100" rx="15" fill="white" />
                    <rect class="translate-y-[15px]" x="50" width="100" height="100" rx="15" fill="white" />
                    <rect class="rotate-[15deg]" x="100" width="100" height="100" rx="15" fill="white" />
                </svg>

                <div class="p-4 border-t-[1.5px] flex justify-between">
                    <h2 class="text-2xl">Cards</h2>
        
                    <a href={`${base}/learn/cards`} class="text-2xl text-neutral-500">Go</a>
                </div>
            </div>
        {/each}

    </div>
</div>