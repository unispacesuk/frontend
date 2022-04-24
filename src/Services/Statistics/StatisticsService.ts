import { authHeaders, Get } from '../../Util/Request';

async function getCategoryStats(id: number) {
  let response;

  try {
    response = await Get(`stats/category/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

export { getCategoryStats };
