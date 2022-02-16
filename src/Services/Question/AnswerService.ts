import { Get, Post } from '../../Util/Request';

async function getAnswers(id: string) {
  const { body } = await Get(`answer/all/${id}`);

  return Promise.resolve(body);
}

async function submitAnswer(id: string, content: any) {
  const { body } = await Post(`answer/${id}`, content);

  return Promise.resolve(body);
}

export { getAnswers, submitAnswer };
