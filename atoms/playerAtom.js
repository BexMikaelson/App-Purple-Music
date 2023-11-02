import { atom } from "recoil";

export const playState = atom({
  key: "playState",
  default: false,
});

export const playingTrackState = atom({
  key: "playingTrackState",
  default: "",
});

export const toggleSearch = atom({
  key: "toggleSearch",
  default: false,
});

export const toggleSearchAlbumSongs = atom({
  key: "toggleSearchAlbumSongs",
  default: false,
});

export const selectedUrisState = atom({
  key: 'selectedUrisState',
  default: [],
});

export const currentSongIndexState = atom({
  key: 'currentSongIndexState',
  default: 0,
});
