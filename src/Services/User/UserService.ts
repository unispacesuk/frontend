import { Post, authHeaders, Get, Patch } from '../../Util/Request';

async function uploadAvatar(data: any) {
  let response;
  try {
    response = await Post('user/avatar', data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function getUserStarredThreads() {
  let response;
  try {
    response = await Get('user/thread/starred', authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function updateUserProfile(data: any) {
  let response;
  try {
    response = await Patch('user/update', data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function updateUserPassword(data: any) {
  let response;
  try {
    response = await Patch('user/update/password', data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function getUserNotificationSettings() {
  let response;
  try {
    response = await Get('user/notification-settings', authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

interface ISetting {
  type: string;
  setting: string;
  value: boolean;
}

async function updateUserNotificationSetting(data: ISetting) {
  let response;
  try {
    response = await Patch('user/notification-settings', data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

interface IPrivacy {
  type: string;
  value: boolean;
}

async function updateUserPrivacySetting(data: IPrivacy) {
  let response;
  try {
    response = await Patch('user/privacy', data, authHeaders());
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

async function getUserPublicProfile(username: string) {
  let response;
  try {
    response = await Get(`user/data/${username}`);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}

export {
  uploadAvatar,
  getUserStarredThreads,
  updateUserProfile,
  updateUserPassword,
  getUserNotificationSettings,
  updateUserNotificationSetting,
  updateUserPrivacySetting,
  getUserPublicProfile,
};
