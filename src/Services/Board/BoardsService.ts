import { Delete, Get, Patch, Post, authHeaders } from '../../Util/Request';

async function getAllCategories(): Promise<any> {
  const response = await Get('category');

  return Promise.resolve(response);
}

async function addCategory(data: any) {
  const response = await Post('category', data, authHeaders());

  return Promise.resolve(response);
}

async function editCategory(data: any) {
  const response = await Patch('category', data, authHeaders());

  return Promise.resolve(response);
}

async function deleteCategory(id: number) {
  const response = await Delete(`category/${id}`, authHeaders());

  return Promise.resolve(response);
}

async function duplicateCategory(id: number) {
  const response = await Get(`category/duplicate/${id}`, authHeaders());

  return Promise.resolve(response);
}

async function getAllBoards(categoryId: number) {
  const response = await Get(`board/c/${categoryId}`);

  return Promise.resolve(response);
}

async function addBoard(body: any) {
  const response = await Post('board', body, authHeaders());

  return Promise.resolve(response);
}

async function getBoard(id: string | string[]) {
  const board = await Get(`board/${id}`);

  return Promise.resolve(board);
}

async function deleteBoard(id: number) {
  const response = await Delete(`board/${id}`, authHeaders());

  return Promise.resolve(response);
}

async function editBoard(id: number, body: object) {
  const response = await Patch(`board/${id}`, body, authHeaders());

  return Promise.resolve(response);
}

async function addThread(body: object) {
  const response = await Post(`thread/add`, body, authHeaders());

  return Promise.resolve(response);
}

async function getThread(id: string | string[]) {
  const response = await Get(`thread/${id}`);

  return Promise.resolve(response);
}

async function editThread(id: number, body: {}) {
  const response = await Patch(`thread/${id}`, body, authHeaders());

  return Promise.resolve(response);
}

async function deleteThread(id: number) {
  const response = await Delete(`thread/${id}`, authHeaders());

  return Promise.resolve(response);
}

async function addThreadReply(id: number, body: {}) {
  const response = await Post(`thread/${id}/reply`, body, authHeaders());

  return Promise.resolve(response);
}

async function getAllThreadReplies(id: string | string[]) {
  const response = await Get(`thread/${id}/replies`);

  return Promise.resolve(response);
}

async function starThread(id: number, action: string) {
  const response = await Post(`thread/star/${id}`, { action }, authHeaders());

  return Promise.resolve(response);
}

async function getStarredState(id: number) {
  const response = await Get(`thread/star/${id}`, authHeaders());

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
  editThread,
  deleteThread,
  addThreadReply,
  getAllThreadReplies,
  starThread,
  getStarredState,
};
