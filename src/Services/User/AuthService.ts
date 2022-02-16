import { Post } from '../../Util/Request';

interface ILoginData {
  username: string;
  not_username: string;
}

async function doLogin(data: ILoginData) {
  const { body } = await Post('auth/login', data);

  return Promise.resolve(body);
}

export { doLogin };
