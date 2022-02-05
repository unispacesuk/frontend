import { Delete, Get, Post } from '../../Util/Request';
import { Observable } from 'rxjs';

async function getAllCategories(): Promise<any> {
  const categories = await Get('category/all');

  return Promise.resolve(categories);
}

// TODO: Refactor this to use form modal
async function addCategory() {
  const body = {
    title: 'New Cat',
    description: 'New cat desc',
  };
  const data = await Post('category/add', body);
  return Promise.resolve(data);
}

/**
 * This method will run inside the Category component
 * It will fetch cat by cat until all is done and we will not have a join when fetching all cats
 */
async function getAllBoards(categoryId: number) {
  const boards = await Get(`board/get/all/${categoryId}`);

  return Promise.resolve(boards);
}

async function addBoard(body: any) {
  const newBoard = await Post('board/add', body);

  return Promise.resolve(newBoard);
}

async function getBoard(id: string | string[]) {
  const board = await Get(`board/${id}`);

  return Promise.resolve(board);
}

async function addThread(body: object) {
  const newThread = await Post(`thread/add`, body);

  return Promise.resolve(newThread);
}

async function getThread(id: string) {
  const { body } = await Get(`thread/${id}`);

  return Promise.resolve(body.thread);
}

async function deleteThread(id: number) {
  const { body } = await Delete(`thread/${id}`);

  return Promise.resolve(body.message);
}

export {
  addCategory,
  getAllCategories,
  getAllBoards,
  addBoard,
  getBoard,
  addThread,
  getThread,
  deleteThread,
};
