import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSpotify from "../../../hooks/useSpotify";
import Songs from "../../../components/Songs";
import { getSession } from "next-auth/react";

const AlbumPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [songs, setSongs] = useState([]);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (id) {
      if (spotifyApi.getAccessToken()) {
        spotifyApi
          .getAlbumTracks(id)
          .then((data) => {
            console.log(data.body.items);
            const tracksWithStructure = data.body.items.map((item) => ({
              track: item,
            }));
            setSongs(tracksWithStructure);
          })
          .catch((err) => {
            console.error("Something went wrong!", err);
          });
      }
    }
  }, [id, spotifyApi]);

  if (!id) {
    return <p>Loading or invalid album ID...</p>;
  }

  return (
    <div className=" pt-20">
      {songs && songs.length > 0 ? (
        <Songs songs={songs} />
      ) : (
        <p>Loading songs...</p>
      )}
    </div>
  );
};
export default AlbumPage;
//Server rendering, pre rendering on the server to get the accsec key before rendering.
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
