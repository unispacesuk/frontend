import { Get, Post } from '../../Util/Request';
import { IQuestion } from '../../Interfaces/Question/IQuestion';

/**
 * Get all questions
 * this function can also be used with search
 */
async function getAllQuestions(query?: any) {
  let reqUrl = `question/all`;
  if (query !== undefined) {
    reqUrl = reqUrl + `?${query}`;
  }

  const { body } = await Get(reqUrl);

  return Promise.resolve(body);
}

/**
 *
 * @param question
 */
async function submitQuestion(question: IQuestion) {
  const response = await Post('question', question);

  return Promise.resolve(response);
}

/**
 *
 * @param id
 */
async function getQuestion(id: string) {
  // get single question from id
}

export { getAllQuestions, submitQuestion, getQuestion };
