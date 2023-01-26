import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { albumTracks } from "../atoms/songAtom";
import Song from "../components/Song"

const Songs = ({ songs = [] }) => {
    return (
        <div className="px-8 flex flex-col space-y-1 pb-28">
            {/* <h1>songs</h1> */}
            {songs.map((track, i) => (
                <Song key={track.track.id} track={track} order={i} />
            ))}

        </div>);
}

export const PlaylistSongs = () => {
    const playlist = useRecoilValue(playlistState)
    return <Songs songs={playlist?.tracks.items} />;
}

export const AlbumSongs = () => {
    const songs = useRecoilValue(albumTracks)
    return <Songs songs={songs.map(song => ({ track: song }))} />;
}



export default Songs;
