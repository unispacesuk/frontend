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

  return Get(reqUrl);
}

function submitQuestion(question: IQuestion) {
  return Post('question', question, authHeaders());
}

function getQuestion(id: string) {
  return Get(`question/${id}`);
}

function deleteQuestion(id: number) {
  return Delete(`question/${id}`, authHeaders());
}

async function submitVote(id: string, type: string) {
  const response = await Post(`question/${id}/vote/${type}`, {}, authHeaders());

  return Promise.resolve(response);
}

async function getMyVote(id: string) {
  const { vote } = await Get(`question/myvote/${id}`, authHeaders());

  return Promise.resolve(vote);
}

function getOPData(id: string) {
  return Get(`user/data/id/${id}`);
}

interface QuestionUpdateData {
  title: string;
  description: string;
}
function saveQuestion(id: string, data: QuestionUpdateData) {
  return Patch(`question/${id}`, data, authHeaders());
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
