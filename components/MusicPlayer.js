import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import {
  selectedUrisState,
  currentSongIndexState,
} from "../atoms/playerAtom";
import useSongInfo from "../hooks/useSongInfo";
import SpotifyPlayer from "react-spotify-web-playback";

export function MusicPlayer() {
  const { data: session } = useSession();
  const [currentTrackId, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(0.5);
  const songInfo = useSongInfo(null);
  const selectedUris = useRecoilValue(selectedUrisState);
  const currentSongIndex = useRecoilValue(currentSongIndexState);

  useEffect(() => {
    if (session) {
    }
  }, [session]);

  const playbackCallback = ({ track }) => {
    setIsPlaying(true);
    setCurrentIdTrack(track.id);
  };

  return (
    <div className="h-24 bg-gradient-to-b from-black to-purple-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="fixed bottom-0 left-0 w-full z-50">
        {session && (
           <SpotifyPlayer
            token={session.user.accessToken}
            uris={selectedUris}
            play={isPlaying}
            volume={volume}
            callback={playbackCallback}
            syncExternalDevice
            offset={currentSongIndex}
          />
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
