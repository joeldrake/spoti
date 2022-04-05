<script>
	export let track;
	export let audioFeatures;
</script>

<button class="btn" on:click={() => history.back()}>Go Back</button>

{#if track}
	<div class="heading">
		<img
			src={track.album.images[2].url}
			alt={track.name}
			width={track.album.images[2].width}
			height={track.album.images[2].height}
		/>
		<div>
			<h2>{track.artists[0].name}</h2>
			<h1>{track.name}</h1>
		</div>
	</div>

	{track.preview_url}

	<pre>{JSON.stringify(track, null, 4)}</pre>
	<pre>{JSON.stringify(audioFeatures, null, 4)}</pre>
{/if}

<style>
	.heading {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1rem;
	}
	img {
		display: block;
		margin: 0 auto;
		width: 100%;
		max-width: 64px;
		height: auto;
	}
	h1,
	h2 {
		margin: 0;
	}
	h2 {
		color: var(--color-subtle);
	}
</style>
