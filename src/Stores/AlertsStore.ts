import { defineStore } from 'pinia';

interface IRoomAlert {
  roomId: string;
  hasNewMessage: boolean;
}

export const useAlertStore = defineStore('alertStore', {
  state: () => {
    return {
      rooms: <IRoomAlert[]>[],
    };
  },
  getters: {
    roomAlerts: (state) => state.rooms,
  },
});
