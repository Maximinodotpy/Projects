<script lang="ts">
    import {
        Alert,
        Button,
        Label,
        Select,
        Modal,
    } from 'flowbite-svelte';
    import download from 'downloadjs';


    export let text = '';
    export let voice = null;

    let output_source = '';
    let modalOpen = false;

    enum ModalStep {
        INSTRUCTIONS,
        CONVERTING,
        DOWNLOADING,
    }

    let modalStep: ModalStep = ModalStep.INSTRUCTIONS;


    async function recordAndDownload() {
        console.log("Record and download");

        modalStep = ModalStep.CONVERTING;

        const blob = await new Promise(async (resolve) => {
        console.log("picking system audio");

        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
        });

        const track = stream.getAudioTracks()[0];

        if (!track) throw "System audio not available";

        stream.getVideoTracks().forEach((track) => track.stop());
        const mediaStream = new MediaStream();
        mediaStream.addTrack(track);
        const chunks = [];

        const mediaRecorder = new MediaRecorder(mediaStream, {
            bitsPerSecond: 128000,
        });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            stream.getTracks().forEach((track) => track.stop());
            mediaStream.removeTrack(track);
            resolve(new Blob(chunks));
        };

        mediaRecorder.start();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.onend = () => mediaRecorder.stop();
        window.speechSynthesis.speak(utterance);
        console.log("speaking...");
        });


        modalStep = ModalStep.DOWNLOADING;

        console.log("audio available", blob);
        output_source = URL.createObjectURL(blob);
        console.log("playing...");

        download(blob, "audio.wav", "audio/wav");
    }
</script>

<Button on:click={() => {
    modalOpen = true;
    modalStep = ModalStep.INSTRUCTIONS;
}}>Convert to Audio File</Button>

<Modal bind:open={modalOpen}>
    {#if modalStep === ModalStep.INSTRUCTIONS}
        <div class="p-4 grid gap-3">
            <h1 class="text-xl font-bold">Instructions</h1>
            <p class="my-2">Please read the following instructions before proceeding.</p>
            <div>
                <ol class="list-decimal ml-6">
                    <li>After you click on "Next" the Browser will ask you which screen to record.</li>
                    <li>Here select the screen itself</li>
                    <li>Turn on Audio (This is important)</li>
                    <li>Let the Browser convert the Text to Speech</li>
                    <li>After that it will download the text</li>
                </ol>
            </div>
            <Button on:click={recordAndDownload}>Next</Button>
        </div>
    {/if}

    {#if modalStep === ModalStep.CONVERTING}
        <div class="p-4 grid gap-3">
            <h1 class="text-xl font-bold">Converting</h1>
            <p class="my-2">Please wait...</p>
            <Button on:click={() => modalStep = ModalStep.DOWNLOADING}>Next</Button>
        </div>
    {/if}

    {#if modalStep === ModalStep.DOWNLOADING}
        <div class="p-4 grid gap-3">
            <h1 class="text-xl font-bold">Downloading</h1>
            
            <audio controls src={output_source}></audio>

            <Button on:click={() => modalOpen = false}>Close</Button>
        </div>
    {/if}
</Modal>