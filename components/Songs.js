import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { albumTracks } from "../atoms/songAtom";
import { useRecoilState } from 'recoil';
import { selectedUrisState, currentSongIndexState } from '../atoms/playerAtom';
import Song from "./Song"

const Songs = ({ songs = [] }) => {
    const [selectedUris, setSelectedUris] = useRecoilState(selectedUrisState);
    const [currentSongIndex, setCurrentSongIndex] = useRecoilState(currentSongIndexState);

    const handleSongSelection = (order, trackUri) => {
        const uris = songs.map(s => s.track.uri);
        setSelectedUris(uris);
        setCurrentSongIndex(order);
    };
    return (
        <div className="px-8 flex flex-col space-y-1 pb-28">
            {/* <h1>songs</h1> */}
            {songs.map((track, i) => (
                <Song key={track.track.id} track={track} order={i} onSelect={() => handleSongSelection(i, track.track.uri)} />
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
