import { Delete, Get, Post, Patch, authHeaders } from '../../Util/Request';
import { IQuestion } from '../../Interfaces/Question/IQuestion';

/**
 * Get all questions
 * this function can also be used with search
 */
async function getAllQuestions(query?: string | null) {
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
  const response = await Post('question', question, authHeaders());

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
  const response = await Delete(`question/${id}`, authHeaders());

  return Promise.resolve(response);
}

async function submitVote(id: string, type: string) {
  const response = await Post(`question/${id}/vote/${type}`, {}, authHeaders());

  return Promise.resolve(response);
}

async function getMyVote(id: string) {
  const { vote } = await Get(`question/myvote/${id}`, authHeaders());

  return Promise.resolve(vote);
}

async function getOPData(id: string) {
  const response = await Get(`user/data/${id}`);

  return Promise.resolve(response);
}

interface QuestionUpdateData {
  title: string;
  description: string;
}
async function saveQuestion(id: string, data: QuestionUpdateData) {
  const response = await Patch(`question/${id}`, data, authHeaders());

  return Promise.resolve(response);
}

export {
  getAllQuestions,
  submitQuestion,
  getQuestion,
  deleteQuestion,
  submitVote,
  getMyVote,
  getOPData,
  saveQuestion,
};
