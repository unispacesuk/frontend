<template>
  <div class="messages-area">
    <div
      class="message-item"
      :class="isOwnMessage(message) ? 'justify-end' : ''"
      v-for="(message, index) of state.messages"
      :key="index"
    >
      <div v-if="isOwnMessage(message)" class="message-row">
        <div class="own">{{ message.message }}</div>
        <CurrentAvatar class="shrink-0" size="xs" />
      </div>
      <div v-else class="message-row">
        <UserAvatar class="shrink-0" :user="{ username: 'rochedo' }" size="xs" />
        <div class="other">{{ message.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import CurrentAvatar from '../User/CurrentAvatar.vue';
  import UserAvatar from '../User/UserAvatar.vue';

  const { currentUser } = useUser();

  const props = defineProps<{
    messages: any;
  }>();

  const state = reactive({
    // messages: props.messages,
    messages: [
      { user_id: 1, message: 'hello world here....' },
      {
        user_id: 2,
        message:
          'another message with some different content then... and even more content to test very long messages just in case.',
      },
    ],
  });

  function isOwnMessage(message: any) {
    return message.user_id === currentUser.id;
  }

  defineExpose({ state, currentUser });
</script>

<style scoped lang="scss">
  .messages-area {
    @apply flex flex-col flex-grow;

    .message-item {
      @apply py-3 flex;

      .message-row {
        @apply flex space-x-2 items-center;

        .own {
          @apply bg-slate-800 text-white px-3 py-2 rounded-md max-w-lg;
        }

        .other {
          @apply bg-gray-100 px-3 py-2 rounded-md max-w-lg;
        }
      }
    }
  }
</style>
