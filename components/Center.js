import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { albumTracks } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { PlaylistSongs, AlbumSongs } from "./Songs";
import Search from "./Search";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";
import { toggleSearch, toggleSearchAlbumSongs } from "../atoms/playerAtom";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [showSearch, setShowSearch] = useRecoilState(toggleSearch);
  /* const [playlistId, setPlaylistId] = useRecoilState(playlistIdState); */
  const router = useRouter();
  const playlistIdFromUrl = router.query.playlist;
  const [SearchAlbumSongs, setSearchAlbumSongs] = useRecoilState(
    toggleSearchAlbumSongs
  );

  useEffect(() => {
    if (playlistIdFromUrl) {
      spotifyApi
        .getPlaylist(playlistIdFromUrl)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((error) => console.log(error));
    }
  }, [spotifyApi, playlistIdFromUrl]);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  //när componenten playlist laddar
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      //om något går fel
      .catch((error) => console.log(error));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center space-x-3  opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 bg-black"
          onClick={() => signOut()}
        >

          <img
            className="rounded-full w-10 h-10 bg-purple-900 "
            src={session?.user.image}
            alt=""
          />

          <div className="flex items-center space-x-2 hover:text-purple-500">
            <h2> {session?.user.name} </h2>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 visible md:invisible">
          <button
            className="flex items-center space-x-2 hover:text-purple-500 "
            onClick={() => setShowSearch(!showSearch)}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
        </div>
      </header>

      {showSearch && (
        <>
          
          <Search />
          <AlbumSongs />
        </>
      )}

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}
      >
        <img
          className="h-44 w-44 shadow-3xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />

        <div>
          <p className="font-bold text-purple-500">PLAYLIST</p>
          <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold text-purple-500">
            {" "}
            {playlist?.name}{" "}
          </h2>
        </div>
      </section>
      <div>
        <hr />
        <PlaylistSongs />
      </div>
    </div>
  );
};

export default Center;
