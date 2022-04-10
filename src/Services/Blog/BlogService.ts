import { authHeaders, Delete, Get, Patch, Post } from '../../Util/Request';

async function getAllBlogs(take: any, page?: any) {
  let response;

  let endpoint = 'blogs';
  if (take) endpoint += `?take=${take}`;
  if (page) endpoint += `&page=${page}`;

  try {
    response = await Get(endpoint);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function createNewBlog(body: object) {
  let response;

  try {
    response = await Post('blogs', body, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function getBlogArticle(articleId: string | string[]) {
  let response;

  try {
    response = await Get(`blogs/article/${articleId}`);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function updateBlogArticle(articleId: number | string[], data: any) {
  let response;

  try {
    response = await Patch(`blogs/article/${articleId}`, data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function deleteBlogArticle(articleId: number) {
  let response;

  try {
    response = await Delete(`blogs/article/${articleId}`, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function voteBlogArticle(articleId: number, data: any) {
  let response;

  try {
    response = await Post(`blogs/article/vote/${articleId}`, data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function submitNewComment(articleId: any, data: any) {
  let response;

  try {
    response = await Post(`blogs/article/comment/${articleId}`, data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function getRecentActivity(articleId: number) {
  let response;

  try {
    response = await Get(`blogs/article/${articleId}/recentactivity`);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

function calculateVotes(votes: any[], type: number, articleId: number) {
  if (votes[0] === null) return 0;
  return votes.filter((vote) => vote.vote_type === type && vote.blog_id === articleId).length;
}

function isVoted(votes: any[], type: number, articleId: number, currentUser: number) {
  if (votes[0] === null) return false;
  return (
    votes.filter(
      (vote) =>
        vote.vote_type === type && vote.blog_id === articleId && vote.user_id === currentUser
    ).length > 0
  );
}

export {
  getAllBlogs,
  createNewBlog,
  getBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
  voteBlogArticle,
  submitNewComment,
  getRecentActivity,
  calculateVotes,
  isVoted,
};
