import { Get, Post } from '../../Util/Request';

const token = localStorage.getItem('access-token') || '';

async function getAnswers(id: string) {
  const { body } = await Get(`answer/all/${id}`);

  return Promise.resolve(body);
}

async function submitAnswer(id: string, content: any) {
  const headers = {
    'authorization': `Bearer ${token}`
  }

  const { body } = await Post(`answer/${id}`, content, headers);

  return Promise.resolve(body);
}

export { getAnswers, submitAnswer };
