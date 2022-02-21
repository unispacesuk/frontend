import { Delete, Get, Post } from '../../Util/Request';

const token = localStorage.getItem('access-token') || '';

async function getAllCategories(): Promise<any> {
  const response = await Get('category/all');

  return Promise.resolve(response);
}

// TODO: Refactor this to use form modal
async function addCategory() {
  const body = {
    title: 'New Cat',
    description: 'New cat desc',
  };

  const headers = {
    'authorization': `Bearer ${token}`
  }

  const response = await Post('category/add', body, headers);
  return Promise.resolve(response);
}

/**
 * This method will run inside the Category component
 * It will fetch cat by cat until all is done and we will not have a join when fetching all cats
 */
async function getAllBoards(categoryId: number) {
  const response = await Get(`board/get/all/${categoryId}`);

  return Promise.resolve(response);
}

async function addBoard(body: any) {
  const headers = {
    'authorization': `Bearer ${token}`
  }

  const response = await Post('board/add', body, headers);

  return Promise.resolve(response);
}

async function getBoard(id: string | string[]) {
  const board = await Get(`board/${id}`);

  return Promise.resolve(board);
}

async function addThread(body: object) {
  const headers = {
    'authorization': `Bearer ${token}`
  }

  const response = await Post(`thread/add`, body, headers);

  return Promise.resolve(response);
}

async function getThread(id: string) {
  const { body } = await Get(`thread/${id}`);

  return Promise.resolve(body.thread);
}

async function deleteThread(id: number) {
  const headers = {
    'authorization': `Bearer ${token}`
  }

  const response = await Delete(`thread/${id}`, headers);

  return Promise.resolve(response);
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
