import type { RequestEvent } from '@sveltejs/kit/types/private';
import { fetchAlbum } from '$lib/api';
import { cookiesFromRequest } from '$lib/cookiesFromRequest';

export async function get({ request, url }: RequestEvent) {
	const id = url.searchParams.get('id');
	console.log('id', id);
	const accessToken = cookiesFromRequest(request)?.accessToken;

	const album = id ? await fetchAlbum(id, accessToken) : null;

	if (album) {
		return {
			body: { album }
		};
	}

	return {
		status: 404
	};
}
