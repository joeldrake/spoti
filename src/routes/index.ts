import type { RequestEvent } from '@sveltejs/kit/types/private';
import { cookiesFromRequest } from '$lib/cookiesFromRequest';

export async function get({ request }: RequestEvent) {
	const accessToken = cookiesFromRequest(request)?.accessToken;

	return {
		body: { authenticated: !!accessToken }
	};

	return {
		status: 404
	};
}
