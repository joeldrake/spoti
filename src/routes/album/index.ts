import type { RequestEvent } from '@sveltejs/kit/types/private';
import { fetchAlbum } from '$lib/api';
import { cookiesFromRequest } from '$lib/cookiesFromRequest';

export async function get({ request, url }: RequestEvent) {
	const id = url.searchParams.get('id');
	if (!id) return { body: { album: null } };
	const accessToken = cookiesFromRequest(request)?.accessToken;

	const album = id ? await fetchAlbum(id, accessToken) : null;

	if (album.error) return { body: { album: null } };

	if (album) {
		return {
			body: { album }
		};
	}

	return {
		status: 404
	};
}
