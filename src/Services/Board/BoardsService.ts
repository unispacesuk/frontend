import { Delete, Get, Patch, Post, authHeaders } from '../../Util/Request';

function getAllCategories(): Promise<any> {
  return Get('category');
}

function addCategory(data: any) {
  return Post('category', data, authHeaders());
}

function editCategory(data: any) {
  return Patch('category', data, authHeaders());
}

function deleteCategory(id: number) {
  return Delete(`category/${id}`, authHeaders());
}

function duplicateCategory(id: number) {
  return Get(`category/duplicate/${id}`, authHeaders());
}

function getAllBoards(categoryId: number) {
  return Get(`board/c/${categoryId}`);
}

function addBoard(body: any) {
  return Post('board', body, authHeaders());
}

function getBoard(id: string | string[]) {
  return Get(`board/${id}`);
}

function deleteBoard(id: number) {
  return Delete(`board/${id}`, authHeaders());
}

function editBoard(id: number, body: object) {
  return Patch(`board/${id}`, body, authHeaders());
}

function addThread(body: object) {
  return Post(`thread/add`, body, authHeaders());
}

function getThread(id: string | string[]) {
  return Get(`thread/${id}`);
}

function editThread(id: number, body: {}) {
  return Patch(`thread/${id}`, body, authHeaders());
}

function deleteThread(id: number) {
  return Delete(`thread/${id}`, authHeaders());
}

function addThreadReply(id: number, body: {}) {
  return Post(`thread/${id}/reply`, body, authHeaders());
}

function getAllThreadReplies(id: string | string[]) {
  return Get(`thread/${id}/replies`);
}

function starThread(id: number, action: string) {
  return Post(`thread/star/${id}`, { action }, authHeaders());
}

function getStarredState(id: number) {
  return Get(`thread/star/${id}`, authHeaders());
}

function getRecentActivity(id: number) {
  return Get(`board/recent/${id}`);
}

function updateAccess(access: object) {
  return Patch(`board/access`, access, authHeaders());
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
  getRecentActivity,
  updateAccess,
};
