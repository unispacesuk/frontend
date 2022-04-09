import { Delete, Get, Patch, Post, authHeaders } from '../../Util/Request';

async function getAllBlogs() {
  const response = await Get('blogs');

  return Promise.resolve(response);
}

async function createNewBlog(body: object) {
  const response = await Post('blogs', body, authHeaders());

  return Promise.resolve(response);
}

async function getBlogArticle(articleId: string | string[]) {
  const response = await Get(`blogs/article/${articleId}`);

  return Promise.resolve(response);
}

async function updateBlogArticle(articleId: number | string[], data: any) {
  const response = await Patch(`blogs/article/${articleId}`, data, authHeaders());

  return Promise.resolve(response);
}

async function deleteBlogArticle(articleId: number) {
  const response = await Delete(`blogs/article/${articleId}`, authHeaders());

  return Promise.resolve(response);
}

async function voteBlogArticle(articleId: number, data: any) {
  const response = await Post(`blogs/article/vote/${articleId}`, data, authHeaders());

  return Promise.resolve(response);
}

export {
  getAllBlogs,
  createNewBlog,
  getBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
  voteBlogArticle,
};
