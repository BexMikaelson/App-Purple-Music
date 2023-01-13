import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useEffect, useState } from "react";

const useSongInfo = () => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null)

    useEffect(()=> {
        //runing asynchronous code inside a useEffect
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch( `https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                    headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}`},
                }
              ).then(response => response.json());
    
            }

        }

    }, [currentTrackId, spotifyApi]);

    return songInfo;
}
 
export default useSongInfo;