<script>
	export let album;
</script>

{#if album}
	<h1>{album.artists[0].name} – {album.name}</h1>
	<img
		src={album.image.url}
		alt={album.name}
		width={album.image.width}
		height={album.image.height}
	/>

	{#if album.tracks}
		<ul>
			<li>
				<div class="track">
					<div>#</div>
					<div>Song</div>
					<div>Popularity</div>
				</div>
			</li>
			{#each album.tracks as track}
				<li>
					<div class="track">
						<div>{track.track_number}.</div>
						<div><a href={track.external_urls.spotify}>{track.name}</a></div>
						<div>
							<progress value={track.popularity} max="100"> {track.popularity}% </progress>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}

	<pre>{JSON.stringify(album, null, 4)}</pre>
{:else}
	<a href="/login">login</a>
{/if}

<style>
	h1 {
		text-align: center;
	}
	img {
		display: block;
		margin: 0 auto;
		width: 100%;
		max-width: 640px;
		height: auto;
	}

	ul {
		list-style: none;
		padding: 0;
	}
	li {
		margin-bottom: 0.5rem;
	}

	a {
		color: var(--color-text);
	}

	.track {
		display: grid;
		grid-template-columns: 1rem 1fr auto;
		gap: 1rem;
	}

	progress[value] {
		/* Reset the default appearance */
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		/* Get rid of default border in Firefox. */
		border: none;
		height: 0.5rem;
	}

	progress[value]::-webkit-progress-bar {
		border-radius: 0.5rem;
	}
	progress[value]::-webkit-progress-value {
		background-color: var(--color-accent);
		border-radius: 0.5rem;
	}

	pre {
		white-space: pre-wrap;
	}
</style>
