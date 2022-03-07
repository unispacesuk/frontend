import { Delete, Get, Patch, Post } from '../../Util/Request';

const token = localStorage.getItem('access-token') || '';

async function getAllCategories(): Promise<any> {
  const response = await Get('category');

  return Promise.resolve(response);
}

async function addCategory(data: any) {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const response = await Post('category', data, headers);
  return Promise.resolve(response);
}

async function editCategory(data: any) {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const response = await Patch('category', data, headers);
  return Promise.resolve(response);
}

async function deleteCategory(id: number) {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const response = await Delete(`category/${id}`, headers);
  return Promise.resolve(response);
}

async function duplicateCategory(id: number) {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const response = await Get(`category/duplicate/${id}`, headers);
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
    authorization: `Bearer ${token}`,
  };

  const response = await Post('board', body, headers);

  return Promise.resolve(response);
}

async function getBoard(id: string | string[]) {
  const board = await Get(`board/${id}`);

  return Promise.resolve(board);
}

async function deleteBoard(id: number) {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const response = await Delete(`board/${id}`, headers);

  return Promise.resolve(response);
}

async function editBoard(id: number, body: object) {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const response = await Patch(`board/${id}`, body, headers);

  return Promise.resolve(response);
}

async function addThread(body: object) {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const response = await Post(`thread/add`, body, headers);

  return Promise.resolve(response);
}

async function getThread(id: string | string[]) {
  const response = await Get(`thread/${id}`);

  return Promise.resolve(response);
}

async function deleteThread(id: number) {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const response = await Delete(`thread/${id}`, headers);

  return Promise.resolve(response);
}

export {
  addCategory,
  editCategory,
  deleteCategory,
  duplicateCategory,
  getAllCategories,
  getAllBoards,
  addBoard,
  getBoard,
  deleteBoard,
  editBoard,
  addThread,
  getThread,
  deleteThread,
};
