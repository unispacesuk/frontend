import { Get, Post, authHeaders } from '../../Util/Request';

async function getAnswers(id: string) {
  const response = await Get(`answer/all/${id}`);

  return Promise.resolve(response);
}

async function submitAnswer(id: string, content: any) {
  const response = await Post(`answer/${id}`, content, authHeaders());

  return Promise.resolve(response);
}

async function markAsBest(id: string) {
  const response = await Post(`answer/${id}/markbest`, {}, authHeaders());

  return Promise.resolve(response);
}

export { getAnswers, submitAnswer, markAsBest };
