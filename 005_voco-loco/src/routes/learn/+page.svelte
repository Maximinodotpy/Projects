<script lang="ts">
    import  { base } from '$app/paths';

    const games: Array<{ name: string, url: string }> = [
        { name: 'Write', url: `${base}/learn/write` },
        { name: 'Match', url: `${base}/learn/match` },
    ];
</script>

<div class="p-5 overflow-auto">
    <div class="max-w-5xl mx-auto">
        <h1 class="mb-10 text-3xl">Learning</h1>
    
        <div class="grid gap-10 md:grid-cols-2">
    
            {#each games as game}
                <div class="border-normal">
                    <svg height="150" width="200" viewBox="0 0 200 100" class="aspect-[2/1] w-full stroke-neutral-600">
                        <rect class="fill-dark-100  rotate-[-15deg] translate-y-[30px]" x="0" width="100" height="100" rx="15" />
                        <rect class="fill-dark-100  translate-y-[15px]" x="50" width="100" height="100" rx="15" />
                        <rect class="fill-dark-100  rotate-[15deg]" x="100" width="100" height="100" rx="15" />
                    </svg>
    
                    <div class="flex justify-between p-4 border-t-normal">
                        <h2 class="text-2xl">{ game.name }</h2>
            
                        <a href={game.url} class="text-2xl text-neutral-500">Go</a>
                    </div>
                </div>
            {/each}
    
        </div>
    </div>
</div>