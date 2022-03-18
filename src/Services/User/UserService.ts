import { Post, authHeaders } from '../../Util/Request';

async function uploadAvatar(data: any) {
  const response = await Post('user/avatar', data, authHeaders());

  return Promise.resolve(response);
}

export { uploadAvatar };
