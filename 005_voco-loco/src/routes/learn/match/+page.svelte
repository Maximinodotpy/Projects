<script lang="ts">
    import { option_values } from '../options';
    import type { Word } from '$lib/edit_modes/word_types';
    import { shuffle } from '$lib/utils';

    let first_selected : number | null = null;
    
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
    }

    function clickCallback(i: number) {

        if (first_selected == null) {
            first_selected = i;
            return;
        } else {

/*             console.log('fasd');
            console.log(gridData[first_selected].connection);
            console.log(gridData[i].connection); */

            if (i == first_selected) {
                first_selected = null;
                return;
            }
            
            if (gridData[first_selected].connection == gridData[i].connection) {
                gridData[first_selected].answered = true;
                gridData[i].answered = true;

                first_selected = null;
            } 
        }
    }

    option_values.subscribe(() => {
        newWords();
    })
    newWords();

</script>

<div class="grow flex flex-col">
    <div class="grid h-full grid-cols-2 gap-5 select-none sm:grid-cols-4 grow p-5">
        {#each gridData as cell, i}
            <button class={`flex font-semibold md:text-2xl items-center justify-center  border-2 ${ i == first_selected ? 'border-blue-300 bg-blue-100' : ''} ${cell.answered ? 'bg-green-100 border-green-300' : ''}`} 
                on:click={() => { cell.answered ? '' : clickCallback(i) }}>
                <!-- { JSON.stringify(cell, null, 2) } -->
                { cell.word }
            </button>
        {/each}
    </div>

    <div class="border-t-[1.5px]">
        <button class="p-5" on:click={newWords}>Shuffle</button>
    </div>
</div>