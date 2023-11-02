import {
  HomeIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
  PlusIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { playlistIdState } from "../atoms/playlistAtom";
import { toggleSearch, toggleSearchAlbumSongs } from "../atoms/playerAtom";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { navigationState } from "../atoms/navigationAtom";
import Link from "next/link";
import { useRouter } from "next/router";
import Center from "./Center";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [showSearch, setShowSearch] = useRecoilState(toggleSearch);
  const [viewState, setViewState] = useRecoilState(navigationState);
  const [SearchAlbumSongs, setSearchAlbumSongs] = useRecoilState(
    toggleSearchAlbumSongs
  );

  console.log(session);
  console.log("playlist", playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  console.log(playlists);

  function handlePlaylistClick(id) {
    setPlaylistId(id);
    const newState = { view: "playlist", playlistId: id };
    setViewState(newState);
  }

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url.includes(`playlist=${playlistId}`)) {
        setShowSearch(!showSearch);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Rensa upp lyssnaren när komponenten unmounts
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [showSearch]);

  return (
    <div className="flex flex-col text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 space-y-5 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex ">
      <h1 className="font-bold text-purple-600">Purple Music</h1>

      <div>
        <Link
          href={`/?playlist=${playlistId}`}
          className="flex items-center space-x-2
          hover:text-purple-500"
        >
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </Link>
      </div>

      <div>
        <Link
          href={"/Center/page"}
          className="flex items-center space-x-2 hover:text-purple-500" /* onClick={() => {setShowSearch(!showSearch)}} */
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </Link>
      </div>

      <div>
        <button
          className="flex items-center space-x-2 hover:text-purple-500"
          onClick={() => setShowSearch(!showSearch)}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
      </div>

      <div>
        <button className="flex items-center space-x-2 hover:text-purple-500">
          <ListBulletIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
      </div>
      <hr className="border-t-[0.1px] border-gray-700" />

      <div>
        <button
          className="flex items-center space-x-2
          hover:text-purple-500"
        >
          <PlusIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
      </div>

      <div>
        <button className="flex items-center space-x-2 hover:text-purple-500">
          <HeartIcon className="h-5 w-5" />
          <p>The ones you love</p>
        </button>
      </div>

      <div>
        <button className="flex items-center space-x-2 hover:text-purple-500">
          <ListBulletIcon className="h-5 w-5" />
          <p>Episodes</p>
        </button>
      </div>
      <hr className="border-t-[0.1px] border-gray-700" />

      {playlists.map((playlist) => (
        <Link
          key={playlist.id}
          href={`/?playlist=${playlist.id}`}
          className="cursor-pointer hover:text-purple-500"
          /* href={`#playlist-${playlist.id}`}  
    onClick={() => handlePlaylistClick(playlist.id)} */
        >
          {/*  className='cursor-pointer hover:text-purple-500' */}
          {playlist.name}
        </Link>
      ))}

      {/* playlist */}

      {/* {playlists.map((playlist) => [
        <p key={playlist.id} 
        
        onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-purple-500'>
          {playlist.name}
          
        </p>
      ]
      )} */}

      {/*    {playlists.map((playlist) => ([
    <p 
       key={playlist.id} 
       onClick={() => {
           setPlaylistId(playlist.id); 
           const newState = { view: 'playlist', playlistId: playlist.id };
           setViewState(newState);
           window.history.pushState(newState, "", "#playlist-" + playlist.id);
           
        
       }} 
       
       className={`cursor-pointer ${playlistId === playlist.id ? 'text-purple-500' : ''}`}
       >
       {playlist.name}
    </p>
  ]))
} */}
    </div>
  );
};

export default Sidebar;
