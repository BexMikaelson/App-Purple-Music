import SpotifyWebApi from "spotify-web-api-node";

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