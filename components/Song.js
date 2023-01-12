import useSpotify from "../hooks/useSpotify";
import millisToMinutesAndSeconds from "../lib/timeDuration"

const Song = ( {order, track} ) => {
    const spotifyApi = useSpotify()
    return (
      <div className="">
        <div className="flex items-center  space-x-4 p-2">
          <p> {order + 1} </p>
          <img
            className="w-20 "
            src={track.track.album.images[0].url}
            alt="song cover image"
          />

          <div>
            <p> {track.track.name} </p>
            <p> {track.track.artists[0].name} </p>
            
            
          </div>
          {/* <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="hidden md:inline "> {track.track.album.name} </p>
          </div> */}
        </div>
        

        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="hidden md:inline "> {track.track.album.name} </p>
          <p> {millisToMinutesAndSeconds(track.track.duration_ms)} </p>
          </div>

        
      </div>
    );
}
 
export default Song;