<script>
	export let authenticated;
</script>

{#if !authenticated}
	<p>Not authenticated</p>
{/if}

<form action="/album">
	<input type="text" value="2wwCc6fcyhp1tfY3J6Javr" name="id" placeholder="Album id" />
	<button type="submit">get album</button>
</form>
