import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import useSongInfo from "../hooks/useSongInfo";

const MusicPlayer = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const[volume, setVolume] = useState(50)
    const songInfo = useSongInfo();

    //useEffekt to uppdate the musicplayer+ playerimg on reload if a song is alredy playing
    useEffect(()=> {

    },[currentTrackIdState, spotifyApi, session])

    return ( 
        <div>
            <h1>player</h1>
            <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />
        </div>
     );
}
 
export default MusicPlayer;