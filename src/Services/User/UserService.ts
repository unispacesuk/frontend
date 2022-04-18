import { Post, authHeaders, Get, Patch } from '../../Util/Request';

async function uploadAvatar(data: any) {
  let response;
  try {
    response = await Post('user/avatar', data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function getUserStarredThreads() {
  let response;
  try {
    response = await Get('user/thread/starred', authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function updateUserProfile(data: any) {
  let response;
  try {
    response = await Patch('user/update', data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function updateUserPassword(data: any) {
  let response;
  try {
    response = await Patch('user/update/password', data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

export { uploadAvatar, getUserStarredThreads, updateUserProfile, updateUserPassword };
