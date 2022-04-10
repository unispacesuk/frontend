import { authHeaders, Get } from '../../Util/Request';

export async function getCategoryStats() {
  let response;

  try {
    response = await Get('stats/category');
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}
