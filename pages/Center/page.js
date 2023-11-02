import Search from "../components/Search";
import {getSession} from "next-auth/react"
import Sidebar from "../components/Sidebar";
import { PlaylistSongs, AlbumSongs } from "../components/Songs"
import MusicPlayer from '../components/MusicPlayer'
const PageCenter = () => {
    return ( 
        <div>
            
            <div>
            <Sidebar></Sidebar>
            </div>
            <div>
            <Search></Search>
            <AlbumSongs />
            </div>
            <div>
              <MusicPlayer></MusicPlayer>
            </div>
        </div>
     );
}
export async function getServerSideProps(context){
    const session = await getSession(context);
  
    return{
      props:{
        session,
      },
    }
  }
 
export default PageCenter;