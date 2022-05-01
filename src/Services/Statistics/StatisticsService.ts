import { authHeaders, Get } from '../../Util/Request';

function getCategoryStats(id: number) {
  return Get(`stats/category/${id}`);
}

export { getCategoryStats };
