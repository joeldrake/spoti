<a href="/">Start</a>
<main>
	<slot />
</main>

<style global>
	:root {
		--color-accent: #00ff00;
		--color-background: #222;
		--color-text: #fff;
	}

	body {
		accent-color: var(--color-accent);
		background: var(--color-background);
		color: var(--color-text);
	}

	a {
		color: var(--color-accent);
	}
	main {
		max-width: 640px;
		margin: 0 auto;
	}
</style>
