import type { RequestEvent } from '@sveltejs/kit/types/private';
import { fetchTrack, fetchAudioFeatures } from '$lib/api';
import { cookiesFromRequest } from '$lib/cookiesFromRequest';

export async function get({ request, url }: RequestEvent) {
	const id = url.searchParams.get('id');
	if (!id) return { body: { track: null, audioFeatures: null } };
	const accessToken = cookiesFromRequest(request)?.accessToken;

	console.log('accessToken', accessToken);

	const promises = [fetchTrack(id, accessToken), fetchAudioFeatures(id, accessToken)];
	const [track, audioFeatures] = await Promise.all(promises);

	if (track && audioFeatures) {
		return {
			body: { track, audioFeatures }
		};
	}

	return {
		status: 404
	};
}
