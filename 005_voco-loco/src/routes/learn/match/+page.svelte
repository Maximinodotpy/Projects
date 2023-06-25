<script lang="ts">
    import { option_values } from '../options';
    import { shuffle } from '$lib/utils';

    let first_selected : number | null = null;

    const success_classes = ['border-green-300', 'bg-green-500', 'text-green-50']

    let start_time = Date.now();

    let milliseconds = 0;
    let seconds = 0;
    let isFinished = false;
    $: {
        if (gridData.every((el) => el.answered)) {
            isFinished = true;
        }
    }
    
    const gridData : Array<{
        selected: Boolean,
        answered: Boolean,
        word: Word,
        connection: string
    }> = []

    function newWords() {
        first_selected = null;

        // Reset Classes for these elements
        const query = `#word_container > button`;
        const elements = document.querySelectorAll(query);
        elements.forEach((el) => {
            el.classList.remove(...success_classes, 'opacity-10', 'pointer-events-none');
        })

        gridData.length = 0;
        for (let i = 0; i < 8; i++) {

            const word = option_values.getNextWord();

            gridData.push({
                selected: false,
                answered: false,
                word: word.translations[$option_values.target_language],
                connection: word.uuid
            })
            
            gridData.push({
                selected: false,
                answered: false,
                word: word.translations[$option_values.origin_language],
                connection: word.uuid
            })
        }

        shuffle(gridData);

        isFinished = false;
        start_time = Date.now();
        setInterval(() => {
            if (isFinished) return;
            milliseconds = Math.floor((Date.now() - start_time));
            seconds = Math.floor((Date.now() - start_time) / 1000);
        }, 1);
    }

    function clickCallback(i: number) {

        if (first_selected == null) {
            first_selected = i;
            return;
        } else {
            if (i == first_selected) {
                first_selected = null;
                return;
            }
            
            if (gridData[first_selected].connection == gridData[i].connection) {
                gridData[first_selected].answered = true;
                gridData[i].answered = true;

                
                // Both elements and add opacity-0 class
                const query = `#cell-${i}, #cell-${first_selected}`;
                const elements = document.querySelectorAll(query);
                
                elements.forEach((el) => {
                    setTimeout(() => {
                        el.classList.add(...success_classes, 'pointer-events-none');
                    }, 1);

                    setTimeout(() => {
                        el.classList.remove(...success_classes);
                        el.classList.add('opacity-10');
                    }, 500);
                })

                first_selected = null;
            } else  {
                const query = '#word_container > button:nth-child(' + (i + 1) + ')';
                const element = document.querySelector(query);
                
                const classes = ['error_wiggle', 'border-red-300', 'bg-red-500', 'text-red-200'];

                if (element) {
                    element.classList.add(...classes);
                    setTimeout(() => {
                        element.classList.remove(...classes);
                    }, 500);
                }
            }
        }
    }

    option_values.subscribe(() => {
        newWords();
    })
</script>

<div class="flex flex-col grow">

    {#if $option_values.word_pool.length < 8}
        <div class="flex items-center justify-center flex-grow">
            <div class="text-2xl">
                Please add atleast 8 Words
            </div>
        </div>
    {:else}
        <div class="grid h-full grid-cols-2 gap-5 p-5 select-none sm:grid-cols-4 grow" id="word_container">
            {#each gridData as cell, i}
                <button class={`transition-all flex font-semibold md:text-2xl items-center justify-center border-2 ${ i == first_selected ? 'border-blue-300 bg-blue-500 text-blue-200' : ''}`} 
                    on:click={() => { cell.answered ? '' : clickCallback(i) }} id={`cell-${i}`}>
                    <!-- { JSON.stringify(cell, null, 2) } -->
                    { cell.word }
                </button>
            {/each}
        </div>

        <div class="flex justify-between pb-10 border-t-normal">
            <div class="p-5 font-mono">
                { seconds }:{ String(milliseconds).slice(-3) }
            </div>

            <button class="p-5" on:click={newWords}>
                { isFinished ? 'Start' : 'Restart' }
            </button>
        </div>
    {/if}
</div>