import { Delete, Get, Post } from '../../Util/Request';
import { IQuestion } from '../../Interfaces/Question/IQuestion';

const token = localStorage.getItem('access-token') || '';

/**
 * Get all questions
 * this function can also be used with search
 */
async function getAllQuestions(query?: string) {
  let reqUrl = `question/all`;
  if (query === undefined) return Promise.resolve();
  // if (typeof query !== 'undefined') {
  reqUrl = reqUrl + `?${query}`;

  const { body } = await Get(reqUrl);

  return Promise.resolve(body);
}

/**
 *
 * @param question
 */
async function submitQuestion(question: IQuestion) {
  const headers = {
    'authorization': `Bearer ${token}`
  }
  const response = await Post('question', question, headers);

  return Promise.resolve(response);
}

/**
 *
 * @param id
 */
async function getQuestion(id: string) {
  const { body } = await Get(`question/${id}`);

  return Promise.resolve(body);
}

/**
 *
 * @param id
 */
async function deleteQuestion(id: number) {
  const response = await Delete(`question/${id}`);

  return Promise.resolve(response);
}

export { getAllQuestions, submitQuestion, getQuestion, deleteQuestion };
