import { Get, Post } from '../Util/Request';

async function getAllCategories(): Promise<any> {
  const data = await Get('category/all');

  return Promise.resolve(data);
}

async function addBoard() {
  const body = {
    title: 'Movies',
    description: 'Want to get recommendations for movies or series to watch?',
    category: 3,
  }

  const data = await Post('board/add', body);

  return Promise.resolve(data);
}

export {
  getAllCategories,
  addBoard
}