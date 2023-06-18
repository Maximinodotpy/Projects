<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    import  { base } from '$app/paths';
</script>

<div class="max-w-5xl p-5 mx-auto">
    <h1 class="mb-5 text-3xl">Learning</h1>

    <div class="grid grid-cols-2 gap-10">

        <div class="p-4 border">
            <h2>Cards</h2>

            <a href={`${base}/learn/cards`}>Go</a>
        </div>

    </div>
</div>