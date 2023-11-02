import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import millisToMinutesAndSeconds from "../lib/timeDuration"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

const Song = ({ order, track, onSelect }) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
   /*  spotifyApi.play({
      uris: [track.track.uri],
    }) */
    onSelect(); 

  }
  return (
    <div className="text-gray-500 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={playSong}>
      <div className="flex items-center  space-x-4 py-5 px-5 ">
        <p> {order + 1} </p>
        {track.track?.album?.images[0].url && (
          <img
            className="w-20 cursor-pointer"
            src={track.track.album.images[0].url}
            alt="song cover image"
          />
        )}

        <div>
          <p className="w-36 lg:w-64 truncate text-white hover:text-purple-700 "> {track.track.name} </p>
          <p className=""> {track.track.artists[0].name} </p>


        </div>
        <div className="flex items-center">
          {<p className=" hidden md:inline w-36 lg:w-60 truncate "> {track?.track.album?.name || ''} </p>}
          <p className=""> {millisToMinutesAndSeconds(track.track.duration_ms)} </p>

        </div>

      </div>

    </div>
  );
}

export default Song;
