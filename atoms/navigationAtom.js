// atoms/navigationAtom.js
import { atom } from 'recoil';

export const navigationState = atom({
  key: 'navigationState',
  default: { 
      view: "home",
      playlistId: null, 
   },
});
