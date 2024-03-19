<script lang="ts">
  import HangmanGraphic from "./Hangman_graphic.svelte";

  const AMOUNT_OF_TRIES = 7;

  let sought_word = "";
  let proposed_word = "";
  let guessed_letters = new Set<string>();

  $: tries_left = AMOUNT_OF_TRIES - Array.from(guessed_letters).filter(letter => !sought_word.includes(letter)).length;

  // Listen to input of the keyboard for letter so user dont have to press the buttons
  window.addEventListener('keydown', (event) => {
    if (sought_word && event.key.match(/[a-z]/i) && tries_left > 0 && event.key.length == 1) {
      guessed_letters.add(event.key.toLowerCase());
      guessed_letters = guessed_letters;
    }
  });

  function tryAgain() {
    sought_word = '';
    guessed_letters = new Set<string>();
  }

</script>

<div class="font-mono">
  <div class="border-b-2 border-dashed">
    <div class="container">
      <h1 class="p-4 text-3xl font-bold">Hangman</h1>
    </div>
  </div>

  <!-- { sought_word } /
  { tries_left } /
  { JSON.stringify(Array.from(guessed_letters)) } -->

  <div class="container p-4">
    {#if sought_word != '' && tries_left > 0 && Array.from(sought_word).some(letter => !guessed_letters.has(letter))}
    
    <!-- Show the amount of wrong guesses -->
    <div class="flex flex-col items-center justify-center">
        <!-- Show guessed letters -->
        <div class="font-mono">
          {#each Array.from(guessed_letters) as letter}
            <span class="{ sought_word.includes(letter) ? 'text-green-700': 'text-red-700' }">{letter}</span>
          {/each}
        </div>
        
        <div>
          {Array.from(guessed_letters).filter(letter => !sought_word.includes(letter)).length} / {AMOUNT_OF_TRIES} Tries
        </div>
        <HangmanGraphic try_num={AMOUNT_OF_TRIES - tries_left} />
        
        <div class="mb-6 font-mono">
          {#each sought_word.split('') as letter}
            <span>
              {guessed_letters.has(letter) ? letter : '_'}
            </span>
          {/each}
        </div>
      </div>

      <div class="flex border-2 border-dashed divide-x-2">
        {#each 'abcdefghijklmnopqrstuvwxyz'.split('') as letter}
          <button on:pointerdown={() => {
            console.log('clicked', letter);
            guessed_letters.add(letter)
            guessed_letters = guessed_letters;
          }} class="p-2 font-mono grow">
            <div class="{Array.from(guessed_letters).includes(letter) ? 'opacity-15': ''}">
              {letter}
            </div>
          </button>
        {/each}
      </div>
    
      <!-- Loose UI -->
    {:else if tries_left <= 0}
      <div class="container">
        <h2 class="mb-2 text-2xl">You lost</h2>
        <button on:click={tryAgain}>Try again</button>
      </div>
      
    <!-- Win UI -->
    {:else if Array.from(sought_word).every(letter => guessed_letters.has(letter)) && sought_word != ''}
      <div class="container">
        <h2 class="mb-2 text-2xl">You won</h2>
        <button on:click={tryAgain}>Try again</button>
      </div>

    <!-- Start UI -->
    {:else}
      <form on:submit={() => {
        let val = (document.getElementById('sought_word_input')?.value ?? '')

        if (val.match(/^[a-z]+$/i)) {
          sought_word = val.toLowerCase();
        }
      }} class="flex border-2 border-dashed">
        <input type="text" placeholder="Enter a word" id="sought_word_input" class="p-2 grow focus:outline-none" autofocus bind:value={proposed_word} />
        <input type="submit" value="Let's go" class="p-2 border-l-2 border-dashed bg-neutral-100">
      </form>
      
      <div class="flex flex-col gap-2 mt-4">       
        <!-- Check if the word contains any special characters -->
        {#if /[^a-z]/i.test(proposed_word)}
          <div class="text-red-700">Only English letters are allowed</div>
        {/if}
  
        <!-- Check if there is no word -->
        {#if proposed_word == ''}
          <div class="text-red-700">You need to enter a word</div>
        {/if}
      </div>
    {/if}
  </div>

</div>