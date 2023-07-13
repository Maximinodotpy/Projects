<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";

    export let uuid: string;

    async function goToSingleView() {
        console.log('Single View for: ' + uuid);
        
        goto(`${base}/`)
            .then(() => {                
                goto(`${base}/edit?uuid=${uuid}`);
            });
    }
</script>

<button on:click={goToSingleView}>🔍</button>

