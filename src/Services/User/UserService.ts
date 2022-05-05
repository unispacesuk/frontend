import { Post, authHeaders, Get, Patch } from '../../Util/Request';
import { debounce } from '../Util';

function uploadAvatar(data: any) {
  return Post('user/avatar', data, authHeaders());
}

function getUserStarredThreads() {
  return Get('user/thread/starred', authHeaders());
}

function updateUserProfile(data: any) {
  return Patch('user/update', data, authHeaders());
}

function updateUserPassword(data: any) {
  return Patch('user/update/password', data, authHeaders());
}

function getUserNotificationSettings() {
  return Get('user/notification-settings', authHeaders());
}

interface ISetting {
  type: string;
  setting: string;
  value: boolean;
}

function updateUserNotificationSetting(data: ISetting) {
  return Patch('user/notification-settings', data, authHeaders());
}

interface IPrivacy {
  type: string;
  value: boolean;
}

function updateUserPrivacySetting(data: IPrivacy) {
  return Patch('user/privacy', data, authHeaders());
}

function getUserPublicProfile(username: string) {
  return Get(`user/data/${username}`);
}

function searchUser(username: string) {
  if (!username) return;
  return Get(`user/search/${username.toLowerCase()}`);
}

function getNotifications() {
  return Get('user/notifications', authHeaders());
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
  searchUser,
  getNotifications,
};
