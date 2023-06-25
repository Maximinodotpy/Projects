import { writable } from "svelte/store";

let current_word: number = 0;
let word_pool: Word[] = [];

const { subscribe, set, update } = writable<GameOptions>({
    word_pool,
    allowed_tags: [],
    target_language: '',
    origin_language: '',
})

subscribe((value : GameOptions) => { word_pool = value.word_pool })

function getNextWord() {            
    current_word++;

    if (current_word >= word_pool.length) {
        current_word = 0;
    }
    /* console.log('Getting Word at ', current_word); */
    
    return word_pool[current_word];
}

export const option_values = {
    subscribe,
    getNextWord,
    resetCurrentWord: () => current_word = 0,
    set,
    update
}