<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<div class="max-w-5xl p-5 mx-auto">
    <h1 class="mb-5 text-3xl">Learning</h1>

    <div class="grid grid-cols-2 gap-10">

        <div class="p-4 border">
            <h2>Cards</h2>

            <form action="learn/cards" use:enhance method="POST">
                <input type="file" name="file" required accept=".json">

                <button type="submit">Go</button>
            </form>
        </div>

    </div>
</div>