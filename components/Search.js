
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import Songs from "./Songs";
import useSpotify from "../hooks/useSpotify";
import { albumTracks } from "../atoms/songAtom";






const Search = () => {
  const spotifyApi = useSpotify()
  const [SearchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [, setAlbumTracks] = useRecoilState(albumTracks);

  async function showSongs(album) {
    const shoot = (a) => {
      a = <Songs></Songs>
    }
    const searchParameters = {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }

    const returnedAlbums = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbumTracks(data.items)
      })
  }





  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials&client_id=" + process.env.NEXT_PUBLIC_CLIENT_ID + "&client_secret=" + process.env.NEXT_PUBLIC_CLIENT_SECRET
    }

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))


  }, []);

  async function search() {
    console.log("Searching... " + SearchInput);

    const SearchParameters = {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }
    const artistID = await fetch("https://api.spotify.com/v1/search?q=" + SearchInput + "&type=artist", SearchParameters)
      .then(response => response.json())
      .then(data => { return data?.artists?.items[0]?.id })

    console.log(artistID)

    const returnedAlbums = await fetch("https://api.spotify.com/v1/artists/" + artistID + "/albums" + "?include_groups=album&market=US&limit=50", SearchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbums(data?.items)
      })
  }
  console.log('album', albums);
  console.log(showSongs, "clickt me");
  return (
    <div >
      <input type="text" placeholder="Search for Song or Artist"
        onKeyPress={event => {
          if (event.key == "Enter") {
            console.log("Enter");
          }
        }}
        onChange={event => setSearchInput(event.target.value)}
      />
      <button type="submit" onClick={search}> <p>Search</p></button>

      <div className="p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-3 gap-5 ">
        {albums.map((album, i) => {
          return (
            <div className="cursor-pointer" key={album.id}>
              <button onClick={(e) => showSongs(album)}>

                <div className="rounded overflow-hidden shadow-lg ">
                  <img
                    className="w-full"
                    src={album?.images[0]?.url}
                    alt=""
                  />
                  <div className="font-bold text-xl mb-2">
                    <p> {album?.name} </p>
                  </div>
                </div>
              </button>
            </div>
          );
        })
        }

      </div>


    </div>
  );
}

export default Search;
