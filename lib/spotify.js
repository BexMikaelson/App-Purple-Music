import SpotifyWebApi from "spotify-web-api-node";

//using scopes from with spotify api endpoints that I am using, and joining them together, creating one long string
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "user-library-read",
  // "user-library-modify",
  "user-follow-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL =
  `https://accounts.spotify.com/authorize?${queryParamString}`.toString();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri:
    /* "http://localhost:3000/api/auth/signin/callback/spotify" */ 'https://app-purple-music-8wwpygbjr-bexmikaelson.vercel.app/api/auth/callback/spotify',
});

export default spotifyApi;

export { LOGIN_URL };
