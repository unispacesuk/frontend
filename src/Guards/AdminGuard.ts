import { Post } from '../Util/Request';
import { RouteLocationNormalized } from 'vue-router';

export async function AdminGuard() {
  try {
    await Post('auth/isadmin', {});
    // to({ name: 'adminPanel' });
    return true;
  } catch (error) {
    return false;
  }
}
