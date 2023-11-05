import Search from "../../components/Search";
import Songs from "../../components/Songs";
import { useRecoilValue, useRecoilState } from "recoil";
import { toggleSearch, toggleSearchAlbumSongs } from "../../atoms/playerAtom";
import { PlaylistSongs, AlbumSongs } from "../../components/Songs";
import { getSession } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
const SearchPage = () => {
  const [showSearch, setShowSearch] = useRecoilState(toggleSearch);
  const { data: session } = useSession();
  return (
    <div className=" p-20">
      <Search />
      {showSearch && (
        <>
          <AlbumSongs />
        </>
      )}
    </div>
  );
};

export default SearchPage;

//Server rendering, pre rendering on the server to get the accsec key before rendering.
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
