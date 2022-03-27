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

export { getAllBlogs, createNewBlog, getBlogArticle };
