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

  const response = await Get(reqUrl);

  return Promise.resolve(response);
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
  const response = await Get(`question/${id}`);

  return Promise.resolve(response);
}

/**
 *
 * @param id
 */
async function deleteQuestion(id: number) {
  const response = await Delete(`question/${id}`);

  return Promise.resolve(response);
}


async function submitVote(id: string, type: string) {
  const headers = {
    'authorization': `Bearer ${token}`
  }

  const response = await Post(`question/${id}/vote/${type}`, {}, headers);

  return Promise.resolve(response);
}

async function getMyVote(id: string) {
  const headers = {
    'authorization': `Bearer ${token}`
  }

  const { vote } = await Get(`question/myvote/${id}`, headers);

  return Promise.resolve(vote);
}

export { getAllQuestions, submitQuestion, getQuestion, deleteQuestion, submitVote, getMyVote };
