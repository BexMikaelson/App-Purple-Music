import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import { useCallback, useEffect, useState } from "react";
import useSongInfo from "../hooks/useSongInfo";
import {
    ArrowsRightLeftIcon,
    BackwardIcon,
    PauseIcon,
    PlayIcon,
    ForwardIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,

    
} from '@heroicons/react/24/solid'
import { debounce } from "lodash";

const MusicPlayer = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const[volume, setVolume] = useState(50)
    const songInfo = useSongInfo(null);

    const fetchCurrentSong = () =>{
        if(!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                // console.log('playing: ', data.body?.item);
                setCurrentIdTrack(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data)=> {
                    setIsPlaying(data.body?.is_playing);
                })

            })
        }
    };

    const handlePlayPause = () => {
      spotifyApi.getMyCurrentPlaybackState().then((data)=> {
        if (data.body?.is_playing){
          spotifyApi.pause();
          setIsPlaying(false)
        } else {
          spotifyApi.play();
          setIsPlaying(true)
        }
      });
    };

    //useEffekt to uppdate the musicplayer+ playerimg on reload if a song is alredy playing
    useEffect(()=> {
        if (spotifyApi.getAccessToken() && !currentTrackId){
            //fetch the song info
            fetchCurrentSong();
            setVolume(50);
        }

    },[currentTrackIdState, spotifyApi, session]);

    useEffect(()=> {
      if (volume > 0 && volume < 100) {
        debouncedAdjustVolume(volume);
      }

    },[volume])

    const debouncedAdjustVolume = useCallback(
      debounce((volume)=> {
        spotifyApi.setVolume(volume).catch((err)=>{});
      }, 500),[]
    )

    return (
      <div className="h-24 bg-gradient-to-b from-black to-purple-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
        
        <div className="flex items-center space-x-4">
          <img
            className="hidden md:inline h-10 w-10"
            src={songInfo?.album?.images?.[0]?.url}
            alt=""
          />

          <div>
            <h3> {songInfo?.name}</h3>
            <p> {songInfo?.artists?.[0]?.name}</p>
          </div>

          
        </div>
        <div className="flex items-center justify-evenly space-x-4 " > 
              <ArrowsRightLeftIcon className="button" />
              <BackwardIcon className="button" onClick={()=> spotifyApi.skipToPrevious()}/>

              {isPlaying ? ( <PauseIcon onClick={handlePlayPause} className="button"/> ):( <PlayIcon onClick={handlePlayPause} className="button" /> )}

              <ForwardIcon className="button" onClick={()=> spotifyApi.skipToNext()}/>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-3">
            <SpeakerXMarkIcon onClick={()=> volume > 0 && setVolume(volume - 10)} className="button"/>
            <input className="w-14 md:w-28" type="range" value={volume} min={0} max={100} onChange={(e)=> setVolume(Number(e.target.value))} />
            <SpeakerWaveIcon onClick={()=> volume < 100 && setVolume(volume + 10)} className="button"/>
          </div>
      </div>
    );
}
 
export default MusicPlayer;