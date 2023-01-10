import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { signIn, useSession} from "next-auth/react";
import spotifyApi from "../lib/spotify";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
    const { data: session, status } = useSession();

    useEffect(()=> {
        if (session){
            // Om Refresh access token inte funkar, redirect till login sida.
            if (session.error === "RefreshAccessTokenError") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }

    }, [session]);
    return spotifyApi;
}
 
export default useSpotify;