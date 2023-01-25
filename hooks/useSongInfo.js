import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useEffect, useState } from "react";

const useSongInfo = () => {
    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState([])

    useEffect(()=> {
        //runing asynchronous code inside a useEffect
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`, {
                    headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}`},
                }
              ).then(res => res.json());

              setSongInfo(trackInfo)
    
            }

        }
        fetchSongInfo();

    }, [currentIdTrack, spotifyApi]);

    return songInfo;
}
 
export default useSongInfo;