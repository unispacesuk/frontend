import { defineStore } from 'pinia';

interface IRoomAlert {
  roomId: string;
  hasNewMessage: boolean;
}

export const useAlertStore = defineStore('alertStore', {
  state: () => {
    return {
      rooms: <IRoomAlert[]>[],
      bell: <boolean>false,
    };
  },
  actions: {
    setNotification(value: boolean) {
      this.$state.bell = value;
    },
  },
  getters: {
    roomAlerts: (state) => state.rooms,
    notification: (state) => state.bell,
  },
});
