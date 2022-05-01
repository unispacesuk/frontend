import { authHeaders, Delete, Get, Patch, Post } from '../../Util/Request';

function getAllBlogs(take: any, page?: any) {
  let endpoint = 'blogs';
  if (take) endpoint += `?take=${take}`;
  if (page) endpoint += `&page=${page}`;

  return Get(endpoint);
}

function createNewBlog(body: object) {
  return Post('blogs', body, authHeaders());
}

function getBlogArticle(articleId: string | string[]) {
  return Get(`blogs/article/${articleId}`);
}

function updateBlogArticle(articleId: number | string[], data: any) {
  return Patch(`blogs/article/${articleId}`, data, authHeaders());
}

function deleteBlogArticle(articleId: number) {
  return Delete(`blogs/article/${articleId}`, authHeaders());
}

function voteBlogArticle(articleId: number, data: any) {
  return Post(`blogs/article/vote/${articleId}`, data, authHeaders());
}

function submitNewComment(articleId: any, data: any) {
  return Post(`blogs/article/comment/${articleId}`, data, authHeaders());
}

function getRecentActivity(articleId: number) {
  return Get(`blogs/article/${articleId}/recentactivity`);
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
