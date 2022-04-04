<script>
	export let authenticated;
</script>

{#if !authenticated}
	<a href="/login">Login</a>
{/if}

<a href="/login">Login</a>
<form action="/album">
	<input type="text" value="2wwCc6fcyhp1tfY3J6Javr" name="id" placeholder="Album id" />
	<button type="submit">get album</button>
</form>
