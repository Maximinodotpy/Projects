<script>
	let color = '#000000'
	let bgcolor = '#ffffff'
	let content = 'https://maximmaeder.com'
	let margin = 0
	let size = 150

	$: url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${content}&margin=${margin}&bgcolor=${bgcolor.slice(1)}&color=${color.slice(1)}`
</script>

<div class="h-screen bg-sky-900 text-sky-200 font-semibold w-screen overflow-x-hidden transition-all">
	<h1 class="text-2xl px-8 py-4 shadow-md bg-sky-800 sticky top-0">QR Code Generator</h1>

	<div class="grid grid-cols-1 md:grid-cols-2">
		<div class="p-8 flex flex-col gap-10 text-xl justify-center">
			<label for="content" class="grid grid-cols-2 gap-3">
				<span>Content</span>
				<input class="w-full border border-b-2 border-sky-700 px-4 py-2" bind:value={content} id="content">
			</label>

			<label for="margin" class="grid grid-cols-2 gap-3">
				<span>Margin</span>
				<input class="w-full border border-b-2 border-sky-700 px-4 py-2" id="margin" bind:value={margin} inputmode="numeric" type="number" min="0" max="50" />
			</label>
			
			<label for="size" class="grid grid-cols-2 gap-3">
				<span>Size</span>
				<input class="w-full border border-b-2 border-sky-700 px-4 py-2" id="size" bind:value={size} inputmode="numeric" type="number" />
			</label>

			<label for="color" class="grid grid-cols-2 gap-3">
				<span>Text Color</span>
				<input class="w-full" id="color" type="color" bind:value={color} />
			</label>

			<label for="bgcolor" class="grid grid-cols-2 gap-3">
				<span>Background Color</span>
				<input class="w-full" id="bgcolor" type="color" bind:value={bgcolor} />
			</label>
		</div>
		<div class="p-8 flex flex-col items-center">
			<a href={url} target="_blank" class="block w-full md:w-[400px]">
			  <img src={url} alt="QR Code" class="shadow-md w-full">
			</a>

			<div>
				<button class="bg-sky-800 text-sky-200 p-2 rounded" on:click={() => navigator.clipboard.writeText(url)}>Copy URL</button>
				<!-- Copy Image -->
				<!-- <button class="bg-sky-800 text-sky-200 p-2 rounded" on:click={() => navigator.clipboard.writeText(`<img src="${url}" alt="QR Code">`)}>Copy Image</button> -->
			</div>

			<div class="whitespace-nowrap max-w-full overflow-auto p-4 font-mono text-xs select-all">
				{url}
			</div>
		</div>
	</div>

</div>