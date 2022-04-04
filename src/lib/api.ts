export async function fetchCurrentSong(token?: string) {
	try {
		const customHeaders = getHeader(token);
		if (!customHeaders) return;

		const url = `https://api.spotify.com/v1/me/player`;

		let data;
		const res = await fetch(url, customHeaders);
		//if 204 no song is playing, return is empty
		if (res.status !== 204) data = await res.json();
		console.log('getCurrentSong', data);

		return data?.item?.name;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAlbum(id: string, token?: string) {
	try {
		const customHeaders = getHeader(token);
		if (!customHeaders) return;

		const url = `https://api.spotify.com/v1/albums/${id}`;

		const res = await fetch(url, customHeaders);
		const data = await res.json();

		console.log('getAlbum', data);

		if (res.status === 200 && data) {
			const trackIds = getTrackIds(data.tracks);

			let tracks = await fetchTracks(trackIds, token);
			if (Array.isArray(tracks)) {
				// remove noice
				tracks = tracks.map((track) => ({
					...track,
					album: undefined,
					available_markets: undefined
				}));
			}

			return { image: data.images[0], name: data.name, tracks };
		}

		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchTracks(trackIds: string[], token?: string) {
	try {
		const customHeaders = getHeader(token);
		if (!customHeaders) return;

		const url = `https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`;

		const res = await fetch(url, customHeaders);
		const data = await res.json();

		console.log('fetchTracks', data);

		if (res.status === 200 && data) {
			return data.tracks;
		}

		return data;
	} catch (error) {
		console.log(error);
	}
}

function getTrackIds(tracks): string[] {
	if (!tracks) return;
	return tracks.items.map((track) => track.id);
}

function getToken() {
	if (!document.cookie) return;
	const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === 'accessToken') {
			return value;
		}
	}
}

function getHeader(token?: string) {
	if (!token) token = getToken();
	if (!token) return;

	return {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	};
}
