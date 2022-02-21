import { Post } from '../../Util/Request';

const token = localStorage.getItem('access-token');

async function uploadAvatar(data: any) {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const response = await Post('user/avatar', data, headers);

  return Promise.resolve(response);
}

export {
  uploadAvatar
}
