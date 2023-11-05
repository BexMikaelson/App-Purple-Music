import { useRecoilState } from "recoil";
import { useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { toggleSearch } from "../atoms/playerAtom";
import Link from "next/link";

const Search = () => {
  const spotifyApi = useSpotify();
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [showSearch, setShowSearch] = useRecoilState(toggleSearch);

  const search = async () => {
    if (!searchInput) return;
    try {
      const response = await spotifyApi.searchAlbums(searchInput, {
        limit: 20,
      });
      setAlbums(response.body.albums.items);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        className="ml-10 bg-purple-700 p-3 rounded-full"
        type="text"
        placeholder="Search Album/Artist"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            search();
          }
        }}
      />
      <button
        className="p-5 rounded-full hover:text-purple-500"
        type="submit"
        onClick={search}
      >
        Search
      </button>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {albums.map((album) => (
          <Link key={album.id} href={`/Search/${album.id}`}>
            <div className="cursor-pointer">
              <div className="rounded overflow-hidden shadow-lg">
                <img
                  className="w-full md:w-40 md:h-40"
                  src={album.images[0]?.url}
                  alt={album.name}
                />
                <div className="font-bold">
                  <p className="w-40 sm:w-40 mg:w-40 lg:w-60 truncate">
                    {album.name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
