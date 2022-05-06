import { Post } from '../Util/Request';

export async function AdminGuard() {
  try {
    await Post('auth/isadmin', {});
    // to({ name: 'adminPanel' });
    return true;
  } catch (error) {
    return false;
  }
}
