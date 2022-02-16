import { Post } from '../../Util/Request';

interface ILoginData {
  username: string;
  not_username: string;
}

// TODO: Backend to verify both passwords
interface IRegisterData {
  email: string;
  username: string;
  not_username: string;
  first_name: string;
  last_name: string;
}

async function doLogin(data: ILoginData) {
  const { body } = await Post('auth/login', data);

  return Promise.resolve(body);
}

async function doRegister(data: IRegisterData) {
  const { body } = await Post('auth/register', data);

  return Promise.resolve(body);
}

export { doLogin, doRegister };
