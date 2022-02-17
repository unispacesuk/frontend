import { defineStore } from 'pinia';
import { IUser } from '../Interfaces/User/IUser';
import { Post } from '../Util/Request';

// TODO: Error Handle this.......
async function doAuthenticate() {
  const { body } = await Post(
    'auth/authenticate',
    {},
    {
      authorization: `Bearer ${localStorage.getItem('access-token')}` || '',
    }
  );

  return Promise.resolve(body);
}

export const useUser = defineStore('userStore', {
  state: () => ({
    user: <IUser>{},
    // loggedIn: <boolean>false,
  }),
  getters: {
    currentUser: (state) => {
      return state.user;
    },
    // isLogged: (state) => {
    //   return state.loggedIn;
    // },
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
        // @ts-ignore
        if (e.reponse) {
          // @ts-ignore
          console.log(e.reponse);
        }
      }

      if (user) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);

      // doAuthenticate()
      //   .then((d) => {
      //     if (d.user) {
      //       this.user = d.user;
      //       return Promise.resolve(true);
      //     }
      //   })
      //   .catch((e) => {
      //     if (e.response) {
      //       console.log(e.response);
      //     }
      //
      //     return Promise.resolve(false);
      //   });
    },
  },
});
