export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export const siteUrl = 'http://localhost:3000';
export const scopes =
	'user-read-private user-read-birthdate streaming user-read-email user-read-playback-state user-modify-playback-state';
export const redirect_uri = siteUrl + '/authenticated';

export const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
	scopes
)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
