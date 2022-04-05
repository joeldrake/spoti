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
				<div class="track heading">
					<div>#</div>
					<div>Song</div>
					<div>Popularity</div>
				</div>
			</li>
			{#each album.tracks as track}
				<li>
					<div class="track">
						<div>{track.track_number}.</div>
						<div><a href={`/track?id=${track.id}`}>{track.name}</a></div>
						<div class="popularity">
							<progress title={`${track.popularity}%`} value={track.popularity} max="100">
								{track.popularity}%
							</progress>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}

	<pre>{JSON.stringify(album, null, 4)}</pre>
{:else}
	<p>Could not find album</p>
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
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-most-subtle);
	}

	a {
		color: var(--color-text);
	}

	.track {
		display: grid;
		grid-template-columns: 1rem 1fr auto;
		gap: 1rem;
	}
	.track.heading {
		color: var(--color-subtle);
	}

	.popularity {
		display: flex;
		align-items: center;
	}

	progress {
		/* Reset the default appearance */
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		/* Get rid of default border in Firefox. */
		border: none;
		height: 0.5rem;
	}

	@media (max-width: 400px) {
		progress {
			width: 20vw;
		}
	}

	progress::-webkit-progress-bar {
		border-radius: 0.5rem;
		background-color: var(--color-very-subtle);
	}
	progress::-webkit-progress-value {
		background-color: var(--color-accent);
		border-radius: 0.5rem;
	}

	pre {
		white-space: pre-wrap;
	}
</style>
