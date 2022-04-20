import { defineStore } from 'pinia';
import { IUser } from '../Interfaces/User/IUser';
import { Post } from '../Util/Request';

// TODO: Error Handle this.......
async function doAuthenticate() {
  let response;

  try {
    response = await Post(
      'auth/authenticate',
      {},
      {
        authorization: `Bearer ${localStorage.getItem('access-token')}` || '',
      }
    );
  } catch (e: any) {
    // console.error(e.response);
    return Promise.reject(e);
  }

  return Promise.resolve(response);
}

export const useUser = defineStore('userStore', {
  state: () => ({
    user: <IUser>{},
    websocket: <WebSocket | null>null,
  }),
  getters: {
    currentUser: (state) => {
      return state.user;
    },
  },
  actions: {
    async authenticate(): Promise<boolean> {
      let user;
      try {
        const data = await doAuthenticate();
        if (data) {
          user = data.user;
          this.user = user;
        }
      } catch (e) {
        localStorage.removeItem('access-token');
        return false;
      }

      if (user) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
  },
});
