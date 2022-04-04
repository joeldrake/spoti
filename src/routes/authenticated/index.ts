import { CLIENT_ID, CLIENT_SECRET, redirect_uri } from '$lib/constants';
import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ url }: RequestEvent) {
	const code = url.searchParams.get('code');

	if (code) {
		const respons = await fetchToken(code);
		return {
			status: 303,
			headers: {
				'set-cookie': [
					`accessToken=${respons.access_token}`,
					`refreshToken=${respons.refresh_token}`
				],
				location: '/'
			}
		};
	}

	// fallback
	return {
		status: 303,
		headers: {
			location: '/'
		}
	};
}

async function fetchToken(code) {
	const url = `https://accounts.spotify.com/api/token`;

	const postBody = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
		redirect_uri
	)}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

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
