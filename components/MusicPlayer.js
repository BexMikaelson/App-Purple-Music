import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
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

const MusicPlayer = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const[volume, setVolume] = useState(50)
    const songInfo = useSongInfo();

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

    },[currentTrackIdState, spotifyApi, session])

    return (
      <div className="h-24 bg-gradient-to-b from-black to-purple-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
        {/* <h1>player</h1> */}
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

          
      </div>
    );
}
 
export default MusicPlayer;