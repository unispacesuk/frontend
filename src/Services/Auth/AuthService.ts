import { Post } from '../../Util/Request';
import { authHeaders } from '../../Util/Request';

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

function doLogin(data: ILoginData) {
  return Post('auth/login', data);
}

function doRegister(data: IRegisterData) {
  return Post('auth/register', data);
}

function changePassword(data: any) {
  return Post('auth/change-password', data);
}

function verifyChangePasswordToken(token: string) {
  return Post('auth/verify-password-token', { token });
}

async function submitUpdatePassword(data: any) {
  return Post('auth/update-password', data);
}

export { doLogin, doRegister, changePassword, verifyChangePasswordToken, submitUpdatePassword };
