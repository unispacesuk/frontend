import { defineStore } from 'pinia';
import { IQuestion } from '../Interfaces/Question/IQuestion';

export const useQuestion = defineStore('questionStore', {
  state: () => ({
    question: <IQuestion>{},
    votes: <number>0,
    vote: {},
    op: {},
  }),
  actions: {
    setQuestion(q: IQuestion) {
      this.question = q;
    },
    doVote(type: string) {
      if (type === 'up') this.votes++;
      if (type === 'down') this.votes--;
    },
    setVote(v: object) {
      this.vote = v;
    },
    setOp(v: object) {
      this.op = v;
    }
  },
});
