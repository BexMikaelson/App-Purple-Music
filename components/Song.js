import useSpotify from "../hooks/useSpotify";
import millisToMinutesAndSeconds from "../lib/timeDuration"

const Song = ( {order, track} ) => {
    const spotifyApi = useSpotify()
    return (
      <div className="text-gray-500 hover:bg-gray-900 rounded-lg cursor-pointer">
        <div className="flex items-center  space-x-4 py-5 px-5 ">
          <p> {order + 1} </p>
          <img
            className="w-20 cursor-pointer"
            src={track.track.album.images[0].url}
            alt="song cover image"
          />

          <div>
            <p className="w-36 lg:w-64 truncate text-white hover:text-purple-700 "> {track.track.name} </p>
            <p className=""> {track.track.artists[0].name} </p>

            {/* <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="flex hidden md:inline w-36 lg:w-60 truncate"> {track.track.album.name} </p>
          <p className="row-end-7 "> {millisToMinutesAndSeconds(track.track.duration_ms)} </p>
          </div> */}
            
            
          </div>
          <div className="flex items-center">
          <p className=" hidden md:inline w-36 lg:w-60 truncate "> {track.track.album.name} </p>
          <p className=""> {millisToMinutesAndSeconds(track.track.duration_ms)} </p>

          </div>
          
          
          {/* <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="hidden md:inline "> {track.track.album.name} </p>
          </div> */}
        </div>


        {/* <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="hidden md:inline "> {track.track.album.name} </p>
          <p> {millisToMinutesAndSeconds(track.track.duration_ms)} </p>
          </div> */}

        
      </div>
    );
}
 
export default Song;