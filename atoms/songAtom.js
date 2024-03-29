import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: 'currentTrackIdState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const isPlayingState = atom({
  key: 'isPlayingState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const albumTracks = atom({
  key: 'albumTracks',
  default: [], // default value (aka initial value)
});


