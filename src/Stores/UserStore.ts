import { defineStore } from 'pinia';
import { IUser } from '../Interfaces/User/IUser';

function doAuthenticate() {
  console.log('hey there');
}

export const useUser = defineStore('userStore', {
  state: () => {
    return {
      user: <IUser>{},
    };
  },
  actions: {
    authenticate() {
      doAuthenticate();
    }
  },
});
