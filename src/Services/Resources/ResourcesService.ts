import { Post, authHeaders, Get, Patch, Delete } from '../../Util/Request';

function uploadResourceFile(data: any) {
  return Post('user/upload/resource', data, authHeaders());
}

function getResourceFiles() {
  return Get('user/resources', authHeaders());
}

function deleteResourceFile(resourceId: string) {
  return Delete(`user/resource/${resourceId}`, authHeaders());
}

export { uploadResourceFile, getResourceFiles, deleteResourceFile };
