<script>
	export let album;
</script>

{#if album}
	<div>
		<img
			src={album.image.url}
			alt={album.name}
			width={album.image.width}
			height={album.image.height}
		/>
	</div>
	<pre>{JSON.stringify(album, null, 4)}</pre>
{:else}
	<a href="/login">login</a>
{/if}

<style>
	img {
		display: block;
		margin: 0 auto;
		width: 100%;
		max-width: 640px;
		height: auto;
	}
</style>
