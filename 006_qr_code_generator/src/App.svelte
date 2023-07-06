<script>
	let color = '#000'
	let bgcolor = '#fff'
	let content = 'Hello'
	let margin = 0

	$: url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${content}&margin=${margin}&bgcolor=${bgcolor.slice(1)}&color=${color.slice(1)}`
</script>

<h1>QR Code Generator</h1>

<input bind:value={content}>
<input bind:value={margin} inputmode="numeric" type="number" min="0" max="50">

<input type="color" bind:value={color} />
<input type="color" bind:value={bgcolor} />

<a href={url} target="_blank">
  <img src={url} alt="QR Code">
</a>

{url}