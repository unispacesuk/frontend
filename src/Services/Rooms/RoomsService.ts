import { Delete, Get, Patch, Post } from '../../Util/Request';
import { authHeaders } from '../../Util/Request';

function getAllRooms() {
  return Get('chat/rooms/all', authHeaders());
}

function getRoomData(roomId: string) {
  return Get(`chat/room/${roomId}`, authHeaders());
}

function createRoom(data: object) {
  return Post('chat/room/new', data, authHeaders());
}

function deleteRoom(roomId: string) {
  return Delete(`chat/room/${roomId}`, authHeaders());
}

function updateRoom(roomId: string, data: object) {
  return Patch(`chat/room/${roomId}`, data, authHeaders());
}

function inviteUser(roomId: string, userId: number) {
  return Post(`chat/room/invite/${roomId}`, {}, authHeaders(), { invitee: userId });
}

function getRoomUsers(roomId: string) {
  return Get(`chat/room/users/${roomId}`, authHeaders());
}

export { getAllRooms, getRoomData, createRoom, deleteRoom, updateRoom, inviteUser, getRoomUsers };
