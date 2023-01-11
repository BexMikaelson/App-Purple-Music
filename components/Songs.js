import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";

const Songs = () => {
    const playlist = useRecoilValue(playlistState)
    return ( 
    <div>
        <h1>songs</h1>
        <p></p>
        {playlist?.tracks.items.map((track) =>(
            <div> {track.track.name} </div>
        ))}

    </div> );
}
 
export default Songs;