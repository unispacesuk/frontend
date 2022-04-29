import { Get } from '../../Util/Request';
import { authHeaders } from '../../Util/Request';

async function getAllRooms() {
  let response;
  try {
    response = await Get('chat/rooms/all', authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function getRoomData(roomId: string) {
  let response;
  try {
    response = await Get(`chat/room/${roomId}`, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

export { getAllRooms, getRoomData };
