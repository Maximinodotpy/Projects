<script lang="ts">
    export let url = ''
</script>

<div class="py-32">
    <div class="h-screen relative">
        <img src="{url}" alt="" class="w-full h-full overflow-hidden object-cover">
        <div class="absolute top-0 right-0 w-full h-[80%] bg-gradient-to-b from-neutral-900 to-transparent"></div>
        <div class="absolute bottom-0 right-0 w-full h-[80%] bg-gradient-to-t from-neutral-900 to-transparent"></div>
    </div>
</div>