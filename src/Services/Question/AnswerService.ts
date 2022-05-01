import { Get, Post, authHeaders } from '../../Util/Request';

function getAnswers(id: string) {
  return Get(`answer/all/${id}`);
}

function submitAnswer(id: string, content: any) {
  return Post(`answer/${id}`, content, authHeaders());
}

function markAsBest(id: string) {
  return Post(`answer/${id}/markbest`, {}, authHeaders());
}

export { getAnswers, submitAnswer, markAsBest };
