<script lang="ts">
  import {
    Alert,
    Button,
    Label,
    Select,
    Modal,
  } from 'flowbite-svelte'
  import { onMount } from 'svelte';
  import RecordAndDownload from './recordAndDownload.svelte';

  let selected_voice = null;

  let all_voices = speechSynthesis.getVoices();

  onMount(() => {
    // update voices
    all_voices = speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => {
      all_voices = speechSynthesis.getVoices();
    };
    
    // set default voice
    selected_voice = speechSynthesis.getVoices()[0];
  });

  // fasdlk s
  let text = "Ich bin ein cooler mann.";

  let output_source = "";

  function speak() {
    console.log("Speak");
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selected_voice;
    speechSynthesis.speak(utterance);
  }
</script>

<div class="flex flex-col h-screen">
  <div class="p-2 flex justify-between items-center">
    <h1 class="text-xl font-bold">Text to Speech</h1>

    <div class="flex gap-2 whitespace-nowrap">
      <!-- A Flowbite select with the voice options -->
      <Select bind:value={selected_voice}>
        {#each all_voices as voice}
          <option value={voice}>{voice.name}</option>
        {/each}
      </Select>
      <Button on:click={speak}>Speak</Button>
      <RecordAndDownload {text} voice={selected_voice} />
    </div>
  </div>

  <textarea bind:value={text} class="grow"></textarea>

  <!-- <audio controls src={output_source}></audio> -->
</div>
