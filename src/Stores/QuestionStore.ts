import { defineStore } from 'pinia';
import { IQuestion } from '../Interfaces/Question/IQuestion';

export const useQuestion = defineStore('questionStore', {
  state: () => ({
    question: <IQuestion>{},
    votes: <number>0,
    voted: <boolean>false,
    type: <string>'',
  }),
  actions: {
    vote(type: string) {
      if (type === 'up') this.votes++;
      if (type === 'down') this.votes--;
    },
    setVoted(v: boolean) {
      this.voted = v;
    },
    setType(v: string) {
      this.type = v;
    }
  },
});
