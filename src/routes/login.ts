import { CLIENT_ID, CLIENT_SECRET, spotifyAuthUrl } from '$lib/constants';
import { cookiesFromRequest } from '$lib/cookiesFromRequest';
import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ request }: RequestEvent) {
	const refreshToken = cookiesFromRequest(request)?.refreshToken;

	if (refreshToken) {
		const respons = await fetchTokenWithRefresh(refreshToken);
		return {
			status: 303,
			headers: {
				'set-cookie': [`accessToken=${respons.access_token}`],
				location: '/'
			}
		};
	}

	return {
		status: 303,
		headers: {
			location: spotifyAuthUrl
		}
	};
}

async function fetchTokenWithRefresh(refreshToken) {
	const url = `https://accounts.spotify.com/api/token`;

	const postBody = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

	const customHeaders = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: postBody
	};

	const res = await fetch(url, customHeaders);
	const data = await res.json();

	return data;
}
