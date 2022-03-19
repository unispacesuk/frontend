import { Post, authHeaders, Get } from '../../Util/Request';

async function uploadAvatar(data: any) {
  const response = await Post('user/avatar', data, authHeaders());

  return Promise.resolve(response);
}

async function getUserStarredThreads() {
  const response = await Get('user/thread/starred', authHeaders());

  return Promise.resolve(response);
}

export { uploadAvatar, getUserStarredThreads };
