import { CLIENT_ID, CLIENT_SECRET, redirect_uri } from '$lib/constants';
import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ url }: RequestEvent) {
	const code = url.searchParams.get('code');

	if (code) {
		const respons = await fetchToken(code);
		const future = new Date(Date.now() + respons.expires_in * 10000000);
		const distantFuture = new Date(Date.now() + 10000 * 10000000); // not sure if refresh_token can live longer than accesstoken
		return {
			status: 303,
			headers: {
				'set-cookie': [
					`accessToken=${respons.access_token}; Expires=${future}`,
					`refreshToken=${respons.refresh_token}; Expires=${distantFuture}`
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
