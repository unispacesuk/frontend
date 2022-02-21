import { Get, Post } from '../../Util/Request';

const token = localStorage.getItem('access-token') || '';

async function getAnswers(id: string) {
  const response = await Get(`answer/all/${id}`);

  return Promise.resolve(response);
}

async function submitAnswer(id: string, content: any) {
  const headers = {
    'authorization': `Bearer ${token}`
  }

  const response = await Post(`answer/${id}`, content, headers);

  return Promise.resolve(response);
}

export { getAnswers, submitAnswer };
