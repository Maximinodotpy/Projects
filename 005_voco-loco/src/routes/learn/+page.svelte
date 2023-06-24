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
                <div class="border-[1.5px]">
                    <svg height="150" width="200" viewBox="0 0 200 100" class="aspect-[2/1] w-full stroke-neutral-300">
                        <rect class="rotate-[-15deg] translate-y-[30px]" x="0" width="100" height="100" rx="15" fill="white" />
                        <rect class="translate-y-[15px]" x="50" width="100" height="100" rx="15" fill="white" />
                        <rect class="rotate-[15deg]" x="100" width="100" height="100" rx="15" fill="white" />
                    </svg>
    
                    <div class="p-4 border-t-[1.5px] flex justify-between">
                        <h2 class="text-2xl">{ game.name }</h2>
            
                        <a href={game.url} class="text-2xl text-neutral-500">Go</a>
                    </div>
                </div>
            {/each}
    
        </div>
    </div>
</div>