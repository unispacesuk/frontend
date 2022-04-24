<template>
  <template v-if="state.isLoading">
    <div>Loading ...</div>
  </template>

  <template v-else>
    <div class="content">
      <div class="title">Notifications</div>

      <div class="title mt-5">Email</div>
      <div class="sub-title">Set what emails you would like to receive.</div>
      <div class="notification-row">
        <div>New comments to your blog articles.</div>
        <Toggle
          :checked="state.notificationSettings.email.articleComments"
          @toggle-change="
            (value) => handleNotificationSettingChange('email', 'article_comments', value)
          "
        />
      </div>
      <div class="notification-row">
        <div>New replies to your threads.</div>
        <Toggle
          :checked="state.notificationSettings.email.threadReplies"
          @toggle-change="
            (value) => handleNotificationSettingChange('email', 'thread_replies', value)
          "
        />
      </div>
      <div class="notification-row">
        <div>New answers to your questions.</div>
        <Toggle
          :checked="state.notificationSettings.email.questionAnswers"
          @toggle-change="
            (value) => handleNotificationSettingChange('email', 'question_answers', value)
          "
        />
      </div>
      <div class="notification-row">
        <div>New private message.</div>
        <Toggle
          :checked="state.notificationSettings.email.privateMessages"
          @toggle-change="
            (value) => handleNotificationSettingChange('email', 'private_messages', value)
          "
        />
      </div>

      <div class="title mt-5">Live</div>
      <div class="sub-title">Set what notifications you want to get while online.</div>
      <div class="notification-row">
        <div>If someone reacts to your blog articles.</div>
        <Toggle
          :checked="state.notificationSettings.live.articleReacted"
          @toggle-change="
            (value) => handleNotificationSettingChange('live', 'article_reacted', value)
          "
        />
      </div>
      <div class="notification-row">
        <div>If someone upvotes one of your questions.</div>
        <Toggle
          :checked="state.notificationSettings.live.questionUpvoted"
          @toggle-change="
            (value) => handleNotificationSettingChange('live', 'question_upvoted', value)
          "
        />
      </div>
      <div class="notification-row">
        <div>If someone stars any of your threads.</div>
        <Toggle
          :checked="state.notificationSettings.live.threadStarred"
          @toggle-change="
            (value) => handleNotificationSettingChange('live', 'thread_starred', value)
          "
        />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { reactive, onBeforeMount, inject } from 'vue';
  import {
    getUserNotificationSettings,
    updateUserNotificationSetting,
  } from '../../Services/User/UserService';
  import { INotificationSettings } from '../../Interfaces/User/IUser';
  import { IBus } from '../../Interfaces/IBus';
  import Toggle from '../Buttons/Toggle.vue';

  const $bus = inject<IBus>('$bus');
  const state = reactive({
    isLoading: true,
    notificationSettings: <INotificationSettings>{},
  });

  onBeforeMount(() => {
    getUserNotificationSettings()
      .then((data) => {
        state.isLoading = false;
        state.notificationSettings = data.response;
      })
      .catch((error) => {
        // console.error(error);
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        state.isLoading = false;
      });
  });

  function handleNotificationSettingChange(type: string, setting: string, value: boolean) {
    // @ts-ignore
    state.notificationSettings[type][name] = value;
    updateUserNotificationSetting({ type, setting, value }).then(() => {
      $bus?.emit('add-toast', 'Notification settings updated.', 'success');
    });
  }

  defineExpose({
    state,
  });
</script>

<style scoped lang="scss">
  .content {
    .title {
      @apply text-xl font-bold;
    }

    .sub-title {
      @apply text-sm px-3 text-gray-500;
    }

    .notification-row {
      @apply w-full border-b border-gray-200 flex justify-between py-3 px-3;
    }
  }
</style>
