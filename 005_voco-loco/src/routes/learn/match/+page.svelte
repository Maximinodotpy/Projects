<script lang="ts">
    import { option_values } from '../options';
    import type { Word } from '$lib/edit_modes/word_types';
    import { shuffle } from '$lib/utils';

    let first_selected : number | null = null;

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
        selected: bool,
        answered: bool,
        word: Word,
        connection: string
    }> = []

    function newWords() {
        first_selected = null;

        gridData.length = 0;
        for (let i = 0; i < 8; i++) {

            const ran_id = Math.floor(Math.random() * $option_values.word_pool.length);

            gridData.push({
                selected: false,
                answered: false,
                word: $option_values.word_pool[ran_id].translations[$option_values.target_language],
                connection: $option_values.word_pool[ran_id].uuid
            })
            
            gridData.push({
                selected: false,
                answered: false,
                word: $option_values.word_pool[ran_id].translations[$option_values.origin_language],
                connection: $option_values.word_pool[ran_id].uuid
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

                first_selected = null;
            } else  {
                const query = '#word_container > button:nth-child(' + (i + 1) + ')';
                const element = document.querySelector(query);

                console.log(element);
                
                const classes = ['error_wiggle', 'border-red-300', 'bg-red-100'];

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
    /* newWords(); */

</script>

<div class="flex flex-col grow">
    <div class="grid h-full grid-cols-2 gap-5 p-5 select-none sm:grid-cols-4 grow" id="word_container">
        {#each gridData as cell, i}
            <button class={`transition-all flex font-semibold md:text-2xl items-center justify-center  border-2 ${ i == first_selected ? 'border-blue-300 bg-blue-100' : ''} ${cell.answered ? 'bg-green-100 border-green-300' : ''}`} 
                on:click={() => { cell.answered ? '' : clickCallback(i) }}>
                <!-- { JSON.stringify(cell, null, 2) } -->
                { cell.word }
            </button>
        {/each}
    </div>

    <div class="border-t-[1.5px] flex justify-between pb-10">
        <div class="p-5 font-mono">
            { seconds }:{ String(milliseconds).slice(-3) }
        </div>

        <button class="p-5" on:click={newWords}>
            { isFinished ? 'Start' : 'Restart' }
        </button>
    </div>
</div>