<nav>
	<a href="/">Start</a>
	<a href="/login">Login</a>
</nav>
<main>
	<slot />
</main>

<style global>
	@import 'https://unpkg.com/open-props';
	:root {
		--color-accent: #1db955;
		--color-background: #222;
		--color-text: #fff;
		--color-subtle: rgba(255, 255, 255, 0.5);
		--color-very-subtle: rgba(255, 255, 255, 0.1);
		--color-most-subtle: rgba(255, 255, 255, 0.05);
	}

	body {
		accent-color: var(--color-accent);
		background-color: var(--color-background);
		color: var(--color-text);

		line-height: var(--font-lineheight-0);
		font-size: var(--font-size-1);
		font-weight: var(--font-weight-2);
		font-family: var(--font-sans);
	}
	@media (max-width: 320px) {
		body {
			font-size: var(--font-size-0);
		}
	}

	h1,
	h2,
	h3 {
		font-family: var(--font-serif);
	}

	a {
		color: var(--color-accent);
		text-decoration: none;
		font-weight: var(--font-weight-4);
	}
	a:hover {
		text-decoration: underline;
	}
	nav,
	main {
		max-width: 640px;
		margin: 0 auto;
	}

	nav {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	pre {
		overflow: hidden;
		overflow-x: auto;
	}

	.btn {
		position: relative;
		padding: 0.75rem 1.5rem;
		font-family: inherit;
		text-transform: uppercase;
		border: 0;
		color: var(--color-text);
		background: var(--color-accent);
		font-size: 13px;
		border-radius: 2rem;
		text-decoration: none;
		cursor: pointer;
	}
</style>
