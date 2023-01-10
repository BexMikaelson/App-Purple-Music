import {atom} from "recoil";

export const playlistIdState = atom({
    key: 'playlistIdState', // unique ID (with respect to other atoms/selectors)
    default: '4dGuAPxqFJX7xskHwKgVmz', // default value (aka initial value)
  });