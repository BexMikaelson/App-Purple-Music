import {
    HomeIcon,
    MagnifyingGlassIcon,
    ListBulletIcon,
    PlusIcon,
    HeartIcon,
} from '@heroicons/react/24/outline'
import {signOut, useSession} from "next-auth/react"
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';


const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);
  console.log(session)
  console.log("playlist" ,playlistId)

  useEffect(()=> {
    if (spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data)=> {
        setPlaylists(data.body.items)
      });
    }

  },[session, spotifyApi])
   console.log(playlists)
    return (
      <div className='text-gray-500 p-5 text-sm border-r border-gray-900 space-y-5 overflow-y-scroll scrollbar-hide h-screen'>
        <h1>Sidebar </h1>

        <div>
          <button className='flex items-center space-x-2 
          hover:text-purple-500' onClick={()=> signOut()} >
            
            <p>Sign Out</p>
          </button>
        </div>

        <div>
          <button className='flex items-center space-x-2 
          hover:text-purple-500' >
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
        </div>

        <div>
          <button className='flex items-center space-x-2 hover:text-purple-500'>
            <MagnifyingGlassIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
        </div>

        <div>
          <button className='flex items-center space-x-2 hover:text-purple-500'>
            <ListBulletIcon className="h-5 w-5" />
            <p>Your Library</p>
          </button>
          
        </div>
        <hr className='border-t-[0.1px] border-gray-700' /> 

        <div>
          <button className='flex items-center space-x-2 
          hover:text-purple-500' >
            <PlusIcon className="h-5 w-5" />
            <p>Create Playlist</p>
          </button>
        </div>

        <div>
          <button className='flex items-center space-x-2 hover:text-purple-500'>
            <HeartIcon className="h-5 w-5" />
            <p>The ones you love</p>
          </button>
        </div>

        <div>
          <button className='flex items-center space-x-2 hover:text-purple-500'>
            <ListBulletIcon className="h-5 w-5" />
            <p>Episodes</p>
          </button>
          
        </div>
        <hr className='border-t-[0.1px] border-gray-700' /> 

        {/* playlist */}
        {playlists.map((playlist)=> [
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-purple-500'>
            {playlist.name}
          </p>
        ]
        )}
        {/* <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p>
        <p className='cursor-pointer hover:text-purple-500'>Playlist name...</p> */}
      </div>
    );
}
 
export default Sidebar;