<script lang="ts">
    import { getContext } from "svelte";
    import type { VociFile, Word } from '$lib/edit_modes/word_type';
    import type { Writable } from "svelte/store";
    import { base } from "$app/paths";
    import { option_values } from "../options";
        
    let current_word_id = 0;
    let current_word_data : Word

    let inputContent = ''
    let current_word_element : HTMLElement
    let show_solution = false
    
    // Reget current word when options change
    option_values.subscribe(() => {
        newWord();
    })


    let points = 0;
    let asked_words = 0;

    function check() {
        if (inputContent.toLowerCase() == current_word_data.translations[$option_values.target_language].toLowerCase()) {
            console.log("Correct");

            inputContent = ''

            asked_words++;

            // @ts-ignore
            if (!show_solution) {
                points++;

                (async () => {
                    const canvas : HTMLElement | null = document.getElementById("bg-canvas");

                    if (!canvas) return;
                    // you should  only initialize a canvas once, so save this function
                    // we'll save it to the canvas itself for the purpose of this demo
                    // @ts-ignore
                    canvas.confetti = canvas.confetti || (await confetti.create(canvas, { resize: true }));
                    
                    // @ts-ignore
                    canvas.confetti({
                        spread: 20,
                        particleCount: 200,
                        origin: { y: 1.2 },
                    });
                })();
            };

            newWord();
        } else {
            console.log("Wrong");

            const error_classes = ['text-red-800', 'error_wiggle']

            current_word_element.classList.add(...error_classes);

            setTimeout(() => {
                current_word_element.classList.remove(...error_classes);
            }, 500);
        }
    }

    function skip() {
        if (!show_solution) {
            show_solution = true;
        } else {
            newWord();
            show_solution = false;
            asked_words++;
        }
    }

    function keydownCallback(event: KeyboardEvent) {
        if (event.key == 'Enter' && !event.ctrlKey) {
            check()
        } else if (event.key == 'Enter' && event.ctrlKey) {
            skip()
        }
    }

    function newWord() {
        show_solution = false;
        inputContent = ''

        current_word_data = option_values.getNextWord();
    }
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.10.1/tsparticles.confetti.bundle.min.js"></script>
</svelte:head>

<div class="flex flex-col overflow-hidden grow">
    <div class="relative text-7xl grow">
        <div class="absolute flex items-center justify-center w-full h-full gap-2 transition-colors" bind:this={current_word_element}>
            <span class="font-semibold">{current_word_data.translations[$option_values.origin_language]} </span>
            
            {#if show_solution}
                <span> = {current_word_data.translations[$option_values.target_language]}</span>
            {/if}
        </div>
        <canvas id="bg-canvas" class="absolute w-full h-full"></canvas>
    </div>
    <div class="border-t-[1.5px] py-2 px-2 md:px-6 flex justify-between">
        <div>{ points }/{asked_words} Points</div>
        <div>
            <a href="{base}/edit?uuid={current_word_data.uuid}">Edit this Word</a>
        </div>
    </div>
    <div class="border-t-[1.5px] flex divide-x-[1.5px]">
        <input type="text" class="p-6 text-2xl focus:outline-none w-[0] grow" placeholder={`Answer in ${$option_values.target_language}`} on:keydown={keydownCallback} bind:value={inputContent}>
        <button on:click={check}  class="px-2 py-6 md:p-6 md:text-2xl focus:outline-none">Check</button>
        <button on:click={skip}  class="px-2 py-6 md:p-6 md:text-2xl focus:outline-none">Skip</button>
    </div>
</div>